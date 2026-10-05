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

// How an entry came to be listed. A program that curates its showcase marks
// those `featured`; entries drawn from a program's complete project record,
// with little more than the facts, are `logged`. Mixing the two is fine, but
// readers can't compare programs without knowing which is which.
export const SELECTIONS = ['featured', 'logged'] as const;

export const SELECTION_PHRASE: Record<(typeof SELECTIONS)[number], string> = {
  featured: 'A written-up example chosen to show the program\'s work',
  logged: 'An entry from the program\'s complete project record',
};
