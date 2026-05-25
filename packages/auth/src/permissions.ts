import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  academicStructure: ["create", "read", "update", "delete"],
  questionBank: ["create", "read", "update", "delete"],
  paperGeneration: ["create", "read", "update", "delete", "publish"],
  studentAttempts: ["create", "read", "update"],
  pdfExports: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  academicStructure: ["create", "read", "update", "delete"],
  questionBank: ["create", "read", "update", "delete"],
  paperGeneration: ["create", "read", "update", "delete", "publish"],
  studentAttempts: ["create", "read", "update"],
  pdfExports: ["create", "read", "update", "delete"],
});

export const teacher = ac.newRole({
  paperGeneration: ["create", "update"],
  pdfExports: ["create", "update"],
});

export const student = ac.newRole({
  paperGeneration: ["create", "update"],
  studentAttempts: ["create"],
  pdfExports: ["create", "update"],
});
