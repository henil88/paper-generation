import { sql } from "drizzle-orm";
import { boolean, check, index, integer, pgEnum, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { uuidv7 } from "../utils/uuid";
import { user } from "./auth";
import { papers } from "./papers";
import { questionOptions, questions } from "./questions";

export const attemptStatusEnum = pgEnum("attempt_status", ["in_progress", "completed"]);

export const paperAttempts = pgTable(
  "paper_attempts",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    paperId: uuid("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => user.id),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    submittedAt: timestamp("submitted_at"),
    score: integer("score"),
    totalMarks: integer("total_marks").notNull(),
    status: attemptStatusEnum("status").default("in_progress").notNull(),
  },
  (t) => [
    index("paper_attempts_student_paper_idx").on(t.studentId, t.paperId),
    check("paper_attempts_score_positive", sql`${t.score} >= 0`),
    check("paper_attempts_total_marks_positive", sql`${t.totalMarks} >= 0`),
  ],
);

export const attemptAnswers = pgTable(
  "attempt_answers",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    attemptId: uuid("attempt_id")
      .notNull()
      .references(() => paperAttempts.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id),
    selectedOptionId: uuid("selected_option_id").references(() => questionOptions.id),
    answerText: text("answer_text"),
    isCorrect: boolean("is_correct"),
    marksAwarded: integer("marks_awarded"),
  },
  (t) => [
    unique().on(t.attemptId, t.questionId),
    index("attempt_answers_attempt_id_idx").on(t.attemptId),
    index("attempt_answers_question_id_idx").on(t.questionId),
    check("attempt_answers_marks_awarded_positive", sql`${t.marksAwarded} >= 0`),
  ],
);
