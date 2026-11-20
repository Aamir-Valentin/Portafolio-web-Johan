import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proyectos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/projects" }),
  schema: z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    date: z.coerce.string().optional(),
    description: z.string().optional(),
    images: z.array(z.any()).optional(),
  }),
});

export const collections = { proyectos };