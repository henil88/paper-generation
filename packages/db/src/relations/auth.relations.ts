import { relations } from "drizzle-orm";
import { account, auditLogs, paperAttempts, paperExports, papers, questions, session, user } from "../schema";

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
