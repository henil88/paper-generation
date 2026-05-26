import { relations } from "drizzle-orm";
import { auditLogs, paperExports, papers, user } from "../schema";

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
