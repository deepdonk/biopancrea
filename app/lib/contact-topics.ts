export const CONTACT_TOPICS = [
  { value: "general", label: "General enquiry" },
  { value: "investment", label: "Investment" },
  { value: "research", label: "Research collaboration" },
  { value: "clinical", label: "Clinical perspective" },
  { value: "press", label: "Press and media" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export const DEFAULT_CONTACT_TOPIC: ContactTopic = "general";

export function isContactTopic(value: unknown): value is ContactTopic {
  return CONTACT_TOPICS.some((topic) => topic.value === value);
}

export function contactTopicLabel(value: ContactTopic) {
  return CONTACT_TOPICS.find((topic) => topic.value === value)?.label ?? CONTACT_TOPICS[0].label;
}
