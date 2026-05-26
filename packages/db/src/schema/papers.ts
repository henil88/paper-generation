import { sql } from "drizzle-orm";
import { check, index, integer, pgEnum, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { uuidv7 } from "../utils/uuid";
import { classes, subjects } from "./academic";
import { user } from "./auth";
import { questions, questionTypeEnum } from "./questions";

export const paperTypeEnum = pgEnum("paper_type", ["random", "custom"]);
export const paperStatusEnum = pgEnum("paper_status", ["draft", "published"]);

export const papers = pgTable(
  "papers",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    createdBy: uuid("created_by")
      .notNull()
      .references(() => user.id),
    classId: uuid("class_id")
      .notNull()
      .references(() => classes.id),
    subjectId: uuid("subject_id")
      .notNull()
      .references(() => subjects.id),
    title: text("title").notNull(),
    paperType: paperTypeEnum("paper_type").notNull(),
    totalMarks: integer("total_marks").notNull(),
    status: paperStatusEnum("status").default("draft").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (t) => [
    index("papers_class_subject_idx").on(t.classId, t.subjectId),
    index("papers_created_by_idx").on(t.createdBy),
    check("papers_total_marks_positive", sql`${t.totalMarks} >= 0`),
  ],
);

export const paperSections = pgTable(
  "paper_sections",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    paperId: uuid("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    displayOrder: integer("display_order").notNull(),
    questionType: questionTypeEnum("question_type").notNull(),
    marksPerQuestion: integer("marks_per_question").notNull(),
    questionCount: integer("question_count").notNull(),
    sectionTotalMarks: integer("section_total_marks").notNull(),
  },
  (t) => [
    index("paper_sections_paper_id_order_idx").on(t.paperId, t.displayOrder),
    unique().on(t.paperId, t.displayOrder),
    check("paper_sections_marks_per_question_positive", sql`${t.marksPerQuestion} > 0`),
    check("paper_sections_question_count_positive", sql`${t.questionCount} > 0`),
    check("paper_sections_total_marks_positive", sql`${t.sectionTotalMarks} >= 0`),
  ],
);

export const paperQuestions = pgTable(
  "paper_questions",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    paperId: uuid("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => paperSections.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id),
    displayOrder: integer("display_order").notNull(),
  },
  (t) => [
    unique().on(t.paperId, t.questionId),
    unique().on(t.sectionId, t.displayOrder),
    index("paper_questions_paper_id_idx").on(t.paperId),
    index("paper_questions_section_idx").on(t.sectionId, t.displayOrder),
    check("paper_questions_display_order_positive", sql`${t.displayOrder} > 0`),
  ],
);
