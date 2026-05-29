import type { chapters, classes, subjects } from "@paper-generation/db";

export const mapClassDto = (data: typeof classes.$inferSelect) => ({
  id: data.id,
  name: data.name,
  displayOrder: data.displayOrder,
});

export const mapSubjectDto = (data: typeof subjects.$inferSelect) => ({
  id: data.id,
  name: data.name,
  classId: data.classId,
});

export const mapChapterDto = (data: typeof chapters.$inferSelect) => ({
  id: data.id,
  name: data.name,
  subjectId: data.subjectId,
  displayOrder: data.displayOrder,
});
