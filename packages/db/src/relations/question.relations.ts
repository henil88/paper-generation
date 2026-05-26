import { relations } from "drizzle-orm";
import { chapters, questionOptions, questions, user } from "../schema";

export const questionRelations = relations(questions, ({ one, many }) => ({
  chapter: one(chapters, {
    fields: [questions.chapterId],
    references: [chapters.id],
  }),
  creator: one(user, {
    fields: [questions.createdBy],
    references: [user.id],
  }),
  options: many(questionOptions),
}));

export const questionOptionRelations = relations(questionOptions, ({ one }) => ({
  question: one(questions, {
    fields: [questionOptions.questionId],
    references: [questions.id],
  }),
}));
