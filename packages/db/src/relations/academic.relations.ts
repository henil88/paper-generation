import { relations } from "drizzle-orm";
import { chapters, classes, questions, subjects } from "../schema";

export const classRelations = relations(classes, ({ many }) => ({
  subjects: many(subjects),
}));

export const subjectRelations = relations(subjects, ({ one, many }) => ({
  class: one(classes, {
    fields: [subjects.classId],
    references: [classes.id],
  }),
  chapters: many(chapters),
}));

export const chapterRelations = relations(chapters, ({ one, many }) => ({
  subjects: one(subjects, {
    fields: [chapters.subjectId],
    references: [subjects.id],
  }),
  questions: many(questions),
}));
