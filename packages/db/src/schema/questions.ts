import { sql } from "drizzle-orm";
import { boolean, check, index, integer, pgEnum, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { uuidv7 } from "../utils/uuid";
import { chapters } from "./academic";
import { user } from "./auth";

export const questionTypeEnum = pgEnum("question_type", ["mcq", "fill_blank", "short_answer", "long_answer"]);
export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const questions = pgTable(
  "questions",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    chapterId: uuid("chapter_id")
      .notNull()
      .references(() => chapters.id, { onDelete: "cascade" }),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => user.id),
    questionType: questionTypeEnum("question_type").notNull(),
    difficulty: difficultyEnum("difficulty").notNull(),
    marks: integer("marks").notNull(),
    questionText: text("question_text").notNull(),
    answerText: text("answer_text"),
    explanation: text("explanation"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index("questions_chapter_id_idx").on(t.chapterId),
    index("questions_created_by_idx").on(t.createdBy),
    index("questions_question_type_idx").on(t.questionType),
    check("questions_marks_positive", sql`${t.marks} > 0`),
  ],
);

export const questionOptions = pgTable(
  "question_options",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    optionText: text("option_text").notNull(),
    isCorrect: boolean("is_correct").default(false).notNull(),
    displayOrder: integer("display_order").notNull(),
  },
  (t) => [
    index("question_options_question_id_idx").on(t.questionId),
    unique().on(t.questionId, t.displayOrder),
    check("question_options_display_order_positive", sql`${t.displayOrder} > 0`),
  ],
);
