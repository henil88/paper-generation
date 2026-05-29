import { db } from "@paper-generation/db";
import { chapters, classes, subjects } from "@paper-generation/db/schema";
import { asc, eq, ilike } from "drizzle-orm";

export const academicService = {
  createClass: async (data: typeof classes.$inferInsert) => {
    const [result] = await db.insert(classes).values(data).returning();
    return result;
  },

  getClasses: async () => {
    return db.query.classes.findMany({
      orderBy: [asc(classes.displayOrder)],
    });
  },

  getClassById: async (id: string) => {
    return db.query.classes.findFirst({
      where: eq(classes.id, id),
      with: {
        subjects: true,
      },
    });
  },

  updateClass: async (id: string, data: Partial<typeof classes.$inferInsert>) => {
    const [result] = await db.update(classes).set(data).where(eq(classes.id, id)).returning();
    return result;
  },

  deleteClass: async (id: string) => {
    const [result] = await db.delete(classes).where(eq(classes.id, id)).returning();
    return result;
  },

  createSubject: async (data: typeof subjects.$inferInsert) => {
    const [result] = await db.insert(subjects).values(data).returning();
    return result;
  },

  getSubjectsByClass: async (classId: string) => {
    return db.query.subjects.findMany({
      where: eq(subjects.classId, classId),
      with: {
        chapters: true,
      },
    });
  },

  getSubjectById: async (id: string) => {
    return db.query.subjects.findFirst({
      where: eq(subjects.id, id),
      with: {
        chapters: true,
      },
    });
  },

  updateSubject: async (id: string, data: { name?: string }) => {
    const [result] = await db.update(subjects).set(data).where(eq(subjects.id, id)).returning();
    return result;
  },

  deleteSubject: async (id: string) => {
    const [result] = await db.delete(subjects).where(eq(subjects.id, id)).returning();
    return result;
  },

  createChapter: async (data: typeof chapters.$inferInsert) => {
    const [result] = await db.insert(chapters).values(data).returning();
    return result;
  },

  getChaptersBySubject: async (subjectId: string) => {
    return db.query.chapters.findMany({
      where: eq(chapters.subjectId, subjectId),
      orderBy: [asc(chapters.displayOrder)],
    });
  },

  getChapterById: async (id: string) => {
    return db.query.chapters.findFirst({
      where: eq(chapters.id, id),
    });
  },

  updateChapter: async (id: string, data: Partial<typeof chapters.$inferInsert>) => {
    const [result] = await db.update(chapters).set(data).where(eq(chapters.id, id)).returning();
    return result;
  },

  deleteChapter: async (id: string) => {
    const [result] = await db.delete(chapters).where(eq(chapters.id, id)).returning();
    return result;
  },

  getAcademicTree: async () => {
    return db.query.classes.findMany({
      orderBy: [asc(classes.displayOrder)],
      with: {
        subjects: {
          with: {
            chapters: {
              orderBy: [asc(chapters.displayOrder)],
            },
          },
        },
      },
    });
  },

  getHierarchy: async () => {
    return db
      .select({
        classId: classes.id,
        className: classes.name,
        subjectId: subjects.id,
        subjectName: subjects.name,
        chapterId: chapters.id,
        chapterName: chapters.name,
      })
      .from(classes)
      .leftJoin(subjects, eq(subjects.classId, classes.id))
      .leftJoin(chapters, eq(chapters.subjectId, subjects.id));
  },

  search: async (q: string) => {
    const classesResult = db.query.classes.findMany({
      where: ilike(classes.name, `%${q}%`),
    });
    const subjectsResult = db.query.subjects.findMany({
      where: ilike(subjects.name, `%${q}%`),
    });
    const chaptersResult = db.query.chapters.findMany({
      where: ilike(chapters.name, `%${q}%`),
    });

    const result = await Promise.all([classesResult, subjectsResult, chaptersResult]);

    return {
      classes: result[0],
      subjects: result[1],
      chapters: result[2],
    };
  },
};
