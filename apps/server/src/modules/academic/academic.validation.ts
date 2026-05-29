import { z } from "zod";

export const uuidSchema = z.uuidv7();

export const createClassSchema = z.object({
  name: z.string().min(1).max(100),
  displayOrder: z.number().int().positive(),
});

export const updateClassSchema = createClassSchema.partial();

export const createSubjectSchema = z.object({
  name: z.string().min(1).max(100),
});

export const updateSubjectSchema = createSubjectSchema.partial();

export const createChapterSchema = z.object({
  name: z.string().min(1).max(150),
  displayOrder: z.number().int().positive(),
});

export const updateChapterSchema = createChapterSchema.partial();
