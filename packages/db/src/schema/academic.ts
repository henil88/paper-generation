import { sql } from "drizzle-orm";
import { check, index, integer, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { uuidv7 } from "../utils/uuid";

export const classes = pgTable(
  "classes",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    name: text("name").notNull(),
    displayOrder: integer("display_order").notNull(),
  },
  (t) => [
    unique().on(t.name),
    unique().on(t.displayOrder),
    check("classes_display_order_positive", sql`${t.displayOrder} > 0`),
  ],
);

export const subjects = pgTable(
  "subjects",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    classId: uuid("class_id")
      .notNull()
      .references(() => classes.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
  },
  (t) => [unique().on(t.classId, t.name), index("subjects_class_id_idx").on(t.classId)],
);

export const chapters = pgTable(
  "chapters",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    name: text("name").notNull(),
    subjectId: uuid("subject_id")
      .notNull()
      .references(() => subjects.id, { onDelete: "cascade" }),
    displayOrder: integer("display_order").notNull(),
  },
  (t) => [
    unique().on(t.subjectId, t.name),
    unique().on(t.subjectId, t.displayOrder),
    index("chapters_subject_id_idx").on(t.subjectId),
    check("chapters_display_order_positive", sql`${t.displayOrder} > 0`),
  ],
);
