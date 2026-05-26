import { sql } from "drizzle-orm";
import { bigint, check, index, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { uuidv7 } from "../utils/uuid";
import { user } from "./auth";
import { papers } from "./papers";

export const paperExports = pgTable(
  "paper_exports",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    paperId: uuid("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    generatedBy: uuid("generated_by")
      .notNull()
      .references(() => user.id),
    fileUrl: text("file_url").notNull(),
    fileSize: bigint("file_size", { mode: "number" }),
    version: integer("version").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("paper_exports_paper_id_idx").on(t.paperId),
    check("paper_exports_version_positive", sql`${t.version} > 0`),
    check("paper_exports_file_size_positive", sql`${t.fileSize} >= 0`),
  ],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: uuid("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("audit_logs_entity_lookup_idx").on(t.entityType, t.entityId),
    index("audit_logs_user_created_idx").on(t.userId, t.createdAt),
  ],
);
