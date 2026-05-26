import { relations } from "drizzle-orm";
import { classes, paperQuestions, paperSections, papers, questions, subjects, user } from "../schema";

export const paperRelations = relations(papers, ({ one, many }) => ({
  creator: one(user, {
    fields: [papers.createdBy],
    references: [user.id],
  }),
  class: one(classes, {
    fields: [papers.classId],
    references: [classes.id],
  }),
  subject: one(subjects, {
    fields: [papers.subjectId],
    references: [subjects.id],
  }),
  sections: many(paperSections),
  questions: many(paperQuestions),
}));

export const paperSectionRelations = relations(paperSections, ({ one, many }) => ({
  paper: one(papers, {
    fields: [paperSections.paperId],
    references: [papers.id],
  }),
  questions: many(paperQuestions),
}));

export const paperQuestionRelations = relations(paperQuestions, ({ one }) => ({
  paper: one(papers, {
    fields: [paperQuestions.paperId],
    references: [papers.id],
  }),
  section: one(paperSections, {
    fields: [paperQuestions.sectionId],
    references: [paperSections.id],
  }),
  question: one(questions, {
    fields: [paperQuestions.questionId],
    references: [questions.id],
  }),
}));
