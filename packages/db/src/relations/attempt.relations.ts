import { relations } from "drizzle-orm";
import { attemptAnswers, paperAttempts, papers, questionOptions, questions, user } from "../schema";

export const paperAttemptRelations = relations(paperAttempts, ({ one, many }) => ({
  paper: one(papers, {
    fields: [paperAttempts.paperId],
    references: [papers.id],
  }),
  student: one(user, {
    fields: [paperAttempts.studentId],
    references: [user.id],
  }),
  answers: many(attemptAnswers),
}));

export const attemptAnswerRelations = relations(attemptAnswers, ({ one }) => ({
  attempt: one(paperAttempts, {
    fields: [attemptAnswers.attemptId],
    references: [paperAttempts.id],
  }),
  question: one(questions, {
    fields: [attemptAnswers.questionId],
    references: [questions.id],
  }),
  selectedOption: one(questionOptions, {
    fields: [attemptAnswers.selectedOptionId],
    references: [questionOptions.id],
  }),
}));
