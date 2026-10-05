// Shared project vocabulary. Every institution tags projects with these, so
// work compares across programs. Adding a value here is a network decision.

// The type of work (a project can have more than one).
export const PROJECT_CATEGORIES = [
  'Visualization & reporting',
  'Data collection & scraping',
  'Data cleaning & integration',
  'Analysis & modeling',
  'Tools & automation',
  'Reproducibility & code migration',
  'Data management & infrastructure',
  'Digitization & heritage',
  'Teaching & training',
  'Program operations',
] as const;

// Who the work was done for.
export const PARTNER_TYPES = ['research', 'instruction', 'campus-operations', 'internal'] as const;

// Reads after a count: "8 for campus offices".
export const PARTNER_TYPE_PHRASE: Record<(typeof PARTNER_TYPES)[number], string> = {
  research: 'for researchers',
  instruction: 'for courses',
  'campus-operations': 'for campus offices',
  internal: 'for the program itself',
};
