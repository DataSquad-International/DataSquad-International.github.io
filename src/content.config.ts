import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const institutions = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/institutions' }),
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    ror_id: z.string().optional(),
    contact_name: z.string().optional(),
    contact_email: z.string().email().optional(),
    local_program_url: z.string().url().optional(),
    // RSS/Atom/JSON feed URL for this squad's own blog. When set, posts are
    // pulled in at build time and shown as excerpt + link-out cards on /blog.
    blog_feed_url: z.string().url().optional(),
    // Local-identifier accent (the institution's own brand color). Used only as
    // a thin accent — card top-stripe, name dot, blog-card left border — never
    // as body text. The shared navy/orange frame stays the unifying brand.
    brand_color: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
    brand_color_alt: z
      .string()
      .regex(/^#[0-9a-fA-F]{6}$/)
      .optional(),
    description: z.string(),
    active: z.boolean().default(true),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    // institution id (matches an institutions/*.yaml filename), optional
    institution: z.string().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    // set when this post was first published elsewhere (rare for native posts)
    canonicalURL: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    institutions: z.array(z.string()),
    contributors: z.array(z.string()).default([]),
    year: z.number(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    institution: z.string(),
    // lead = program lead, staff = program staff, current = current student
    // analyst, alumni = past member. Drives grouping on /people.
    status: z.enum(['lead', 'staff', 'current', 'alumni']).default('staff'),
    orcid: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    email: z.string().email().optional(),
    bio: z.string().optional(),
    headshot: z.string().optional(),
    // optional manual sort within a status group (lower = earlier)
    order: z.number().default(100),
  }),
});

export const collections = { institutions, blog, projects, people };
