import {
  bigint,
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "../utils/uuid";

// ==========================================
// ENUMS
// ==========================================
export const roleEnum = pgEnum("role", ["admin", "teacher", "student"]);
export const questionTypeEnum = pgEnum("question_type", [
  "mcq",
  "fill_blank",
  "short_answer",
  "long_answer",
]);
export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);
export const paperTypeEnum = pgEnum("paper_type", ["random", "custom"]);
export const paperStatusEnum = pgEnum("paper_status", ["draft", "published"]);
export const attemptStatusEnum = pgEnum("attempt_status", [
  "in_progress",
  "completed",
]);

// ==========================================
// 1. BETTER AUTH REQUIRED TABLES & USERS
// ==========================================
export const user = pgTable("user", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_At").notNull(),
  updatedAt: timestamp("updated_At").notNull(),

  role: roleEnum("role").default("student").notNull(),
  schoolName: text("school_name"),
  phone: text("phone"),
});

export const session = pgTable("session", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// ==========================================
// 2. ACADEMIC STRUCTURE
// ==========================================
export const classes = pgTable("classes", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
  displayOrder: integer("display_order").notNull(),
});

export const subjects = pgTable("subjects", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  name: text("name").notNull(),
});

export const classSubjects = pgTable(
  "class_subjects",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    classId: uuid("class_id")
      .notNull()
      .references(() => classes.id, { onDelete: "cascade" }),
    subjectId: uuid("subject_id")
      .notNull()
      .references(() => subjects.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.classId, t.subjectId)],
);

// ==========================================
// 3. QUESTION BANK
// ==========================================
export const questions = pgTable(
  "questions",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    classId: uuid("class_id")
      .notNull()
      .references(() => classes.id),
    subjectId: uuid("subject_id")
      .notNull()
      .references(() => subjects.id),
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
  (t) => [index("questions_class_subject_idx").on(t.classId, t.subjectId)],
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
  (t) => [index("question_options_question_id_idx").on(t.questionId)],
);

// ==========================================
// 4. PAPER GENERATION
// ==========================================
export const papers = pgTable("papers", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  createdBy: uuid("created_by").notNull().references(() => user.id),
  classId: uuid("class_id").notNull().references(() => classes.id),
  subjectId: uuid("subject_id").notNull().references(() => subjects.id),
  title: text("title").notNull(),
  paperType: paperTypeEnum("paper_type").notNull(),
  totalMarks: integer("total_marks").notNull(),
  status: paperStatusEnum("status").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()).notNull(),
}, (t) => [
  index("papers_class_subject_idx").on(t.classId, t.subjectId),
  index("papers_created_by_idx").on(t.createdBy)
]);

export const paperSections = pgTable("paper_sections", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  paperId: uuid("paper_id").notNull().references(() => papers.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  displayOrder: integer("display_order").notNull(),
  questionType: questionTypeEnum("question_type").notNull(),
  marksPerQuestion: integer("marks_per_question").notNull(),
  questionCount: integer("question_count").notNull(),
  sectionTotalMarks: integer("section_total_marks").notNull(),
}, (t) => [
  index("paper_sections_paper_id_order_idx").on(t.paperId, t.displayOrder)
]);

export const paperQuestions = pgTable("paper_questions", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  paperId: uuid("paper_id").notNull().references(() => papers.id, { onDelete: "cascade" }),
  sectionId: uuid("section_id").notNull().references(() => paperSections.id, { onDelete: "cascade" }),
  questionId: uuid("question_id").notNull().references(() => questions.id),
  displayOrder: integer("display_order").notNull(),
}, (t) => [
  unique().on(t.paperId, t.questionId),
  index("paper_questions_section_idx").on(t.sectionId, t.displayOrder)
]);

// ==========================================
// 5. STUDENT ATTEMPTS
// ==========================================
export const paperAttempts = pgTable("paper_attempts", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  paperId: uuid("paper_id").notNull().references(() => papers.id),
  studentId: uuid("student_id").notNull().references(() => user.id),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  submittedAt: timestamp("submitted_at"),
  score: integer("score"),
  totalMarks: integer("total_marks").notNull(),
  status: attemptStatusEnum("status").default("in_progress").notNull(),
}, (t) => [
  index("paper_attempts_student_paper_idx").on(t.studentId, t.paperId)
]);

export const attemptAnswers = pgTable("attempt_answers", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  attemptId: uuid("attempt_id").notNull().references(() => paperAttempts.id, { onDelete: "cascade" }),
  questionId: uuid("question_id").notNull().references(() => questions.id),
  selectedOptionId: uuid("selected_option_id").references(() => questionOptions.id),
  answerText: text("answer_text"),
  isCorrect: boolean("is_correct"),
  marksAwarded: integer("marks_awarded"),
}, (t) => [
  unique().on(t.attemptId, t.questionId),
  index("attempt_answers_attempt_id_idx").on(t.attemptId)
]);

// ==========================================
// 6. PDF EXPORTS & AUDIT
// ==========================================
export const paperExports = pgTable("paper_exports", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  paperId: uuid("paper_id").notNull().references(() => papers.id, { onDelete: "cascade" }),
  generatedBy: uuid("generated_by").notNull().references(() => user.id),
  fileUrl: text("file_url").notNull(),
  fileSize: bigint("file_size", { mode: "number" }),
  version: integer("version").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => [
  index("paper_exports_paper_id_idx").on(t.paperId)
]);

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
  userId: uuid("user_id").references(() => user.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => [
  index("audit_logs_entity_lookup_idx").on(t.entityType, t.entityId),
  index("audit_logs_user_created_idx").on(t.userId, t.createdAt)
]);