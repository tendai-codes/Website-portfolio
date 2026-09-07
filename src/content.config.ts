import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    github: z.string().optional(),
    live: z.string().optional(),
    publication: z.string().optional(),
    visual: z.string().default('grid'),
    question: z.string().optional(),
    focus: z.array(z.string()).default([]),
    outcome: z.string().optional(),
    keyChallenge: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    relatedProject: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
