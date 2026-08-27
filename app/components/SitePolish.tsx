"use client";

import { useEffect } from "react";

const DESKTOP_QUERY = "(min-width: 1051px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function SitePolish() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".global-header");
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const observedReveals = new WeakSet<Element>();
    let frame = 0;
    let touchReset = 0;

    const pathname = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll<HTMLAnchorElement>(".desktop-nav a, .mobile-menu nav a").forEach((link) => {
      const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      if (linkPath === pathname) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    const setPlatformStage = (stage: string) => {
      const story = document.querySelector<HTMLElement>("[data-platform-story]");
      if (!story) return;
      story.dataset.platformStage = stage;
      document.querySelectorAll<HTMLButtonElement>("[data-platform-jump]").forEach((button) => {
        const active = button.dataset.platformJump === stage;
        button.classList.toggle("is-active", active);
        if (active) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
    };

    const updatePlatformProgress = () => {
      const story = document.querySelector<HTMLElement>("[data-platform-story]");
      const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-platform-step]"));
      if (!story || !steps.length) return;
      const storyRect = story.getBoundingClientRect();
      if (storyRect.bottom <= 0 || storyRect.top >= window.innerHeight) return;
      const focusY = window.innerHeight * (desktop.matches ? .5 : .82);
      const closest = steps.reduce((best, step) => {
        const rect = step.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - focusY);
        return distance < best.distance ? { step, distance } : best;
      }, { step: steps[0], distance: Number.POSITIVE_INFINITY });
      const stage = closest.step.dataset.platformStep;
      if (stage) setPlatformStage(stage);
    };

    const updateHeader = () => {
      frame = 0;
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
        const sampleY = header.getBoundingClientRect().height / 2;
        const overDark = desktop.matches && Array.from(document.querySelectorAll<HTMLElement>("[data-header-tone='dark']")).some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= sampleY && rect.bottom > sampleY;
        });
        header.classList.toggle("is-over-dark", overDark);
      }
      updatePlatformProgress();
    };

    const scheduleHeaderUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };

    const preparePage = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((section) => {
        if (observedReveals.has(section)) return;
        observedReveals.add(section);
        if (reducedMotion.matches || section.getBoundingClientRect().top < window.innerHeight * 0.92) section.classList.add("is-visible");
        else revealObserver.observe(section);
      });
      document.documentElement.classList.add("polish-ready");
      scheduleHeaderUpdate();
    };

    const onClick = (event: MouseEvent) => {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>("[data-platform-jump]");
      if (!button) return;
      const target = Array.from(document.querySelectorAll<HTMLElement>("[data-platform-step]")).find((step) => step.dataset.platformStep === button.dataset.platformJump);
      target?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: desktop.matches ? "center" : "end" });
    };

    const resetTilt = (surface?: HTMLElement | null) => {
      const target = surface ?? document.querySelector<HTMLElement>("[data-platform-tilt]");
      target?.style.setProperty("--platform-tilt-x", "0deg");
      target?.style.setProperty("--platform-tilt-y", "0deg");
    };

    const onPointerMove = (event: PointerEvent) => {
      const surface = (event.target as Element | null)?.closest<HTMLElement>("[data-platform-tilt]");
      if (!surface || reducedMotion.matches || event.pointerType !== "mouse") return;
      const rect = surface.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      surface.style.setProperty("--platform-tilt-x", `${(-y * 4).toFixed(2)}deg`);
      surface.style.setProperty("--platform-tilt-y", `${(x * 6).toFixed(2)}deg`);
    };

    const onPointerOut = (event: PointerEvent) => {
      const surface = (event.target as Element | null)?.closest<HTMLElement>("[data-platform-tilt]");
      if (surface && !surface.contains(event.relatedTarget as Node | null)) resetTilt(surface);
    };

    const onPointerDown = (event: PointerEvent) => {
      const surface = (event.target as Element | null)?.closest<HTMLElement>("[data-platform-tilt]");
      if (!surface || reducedMotion.matches || event.pointerType === "mouse") return;
      const rect = surface.getBoundingClientRect();
      const direction = event.clientX < rect.left + rect.width / 2 ? -1 : 1;
      surface.style.setProperty("--platform-tilt-y", `${direction * 5}deg`);
      window.clearTimeout(touchReset);
      touchReset = window.setTimeout(() => resetTilt(surface), 550);
    };

    const mutationObserver = new MutationObserver(preparePage);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    preparePage();
    updateHeader();
    window.addEventListener("scroll", scheduleHeaderUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeaderUpdate, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(touchReset);
      window.removeEventListener("scroll", scheduleHeaderUpdate);
      window.removeEventListener("resize", scheduleHeaderUpdate);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("pointerdown", onPointerDown);
      mutationObserver.disconnect();
      revealObserver.disconnect();
      document.documentElement.classList.remove("polish-ready");
    };
  }, []);

  return null;
}
