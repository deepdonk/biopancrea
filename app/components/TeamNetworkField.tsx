export function TeamNetworkField() {
  const nodes = [
    [112, 144, 26], [278, 102, 18], [438, 164, 31], [570, 98, 15],
    [184, 318, 20], [356, 286, 35], [548, 338, 23], [116, 494, 14],
    [300, 476, 27], [492, 520, 18], [622, 446, 12],
  ] as const;

  return (
    <div className="team-network-field" aria-hidden="true">
      <svg viewBox="0 0 720 680">
        <g className="team-network-links">
          <path d="M112 144 L278 102 L438 164 L570 98 M112 144 L184 318 L356 286 L438 164 M184 318 L116 494 L300 476 L356 286 M356 286 L548 338 L622 446 L492 520 L300 476 M548 338 L570 98" />
          <path d="M112 144 C260 215 430 225 570 98 M116 494 C270 398 455 410 622 446" />
        </g>
        <g className="team-network-nodes">
          {nodes.map(([cx, cy, radius], index) => (
            <g key={`${cx}-${cy}`} className={`team-network-node team-network-node-${index + 1}`}>
              <circle cx={cx} cy={cy} r={radius} />
              <circle cx={cx} cy={cy} r={Math.max(3, radius * 0.18)} />
            </g>
          ))}
        </g>
      </svg>
      <span className="field-index">BP—PEOPLE / NETWORK</span>
    </div>
  );
}
