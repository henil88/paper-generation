import { relations } from "drizzle-orm";
import {
  account,
  attemptAnswers,
  auditLogs,
  chapters,
  classes,
  paperAttempts,
  paperExports,
  paperQuestions,
  paperSections,
  papers,
  questionOptions,
  questions,
  session,
  subjects,
  user,
} from "./schema";

// ==========================================
// 1. BETTER AUTH REQUIRED Relations
// ==========================================
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),

  createdQuestions: many(questions),
  createdPapers: many(papers),

  attempts: many(paperAttempts),
  exports: many(paperExports),

  auditLogs: many(auditLogs),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// ==========================================
// 2. ACADEMIC STRUCTURE
// ==========================================
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

// ==========================================
// 3. QUESTION BANK
// ==========================================
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

// ==========================================
// 4. PAPER GENERATION
// ==========================================
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

// ==========================================
// 5. STUDENT ATTEMPTS
// ==========================================
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

// ==========================================
// 6. PDF EXPORTS & AUDIT
// ==========================================
export const paperExportRelations = relations(paperExports, ({ one }) => ({
  paper: one(papers, {
    fields: [paperExports.paperId],
    references: [papers.id],
  }),
  generatedBy: one(user, {
    fields: [paperExports.generatedBy],
    references: [user.id],
  }),
}));

export const auditLogRelations = relations(auditLogs, ({ one }) => ({
  user: one(user, {
    fields: [auditLogs.userId],
    references: [user.id],
  }),
}));
