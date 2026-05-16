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
    description: z.string(),
    active: z.boolean().default(true),
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
    orcid: z.string().optional(),
    bio: z.string(),
    headshot: z.string().optional(),
  }),
});

export const collections = { institutions, projects, people };
