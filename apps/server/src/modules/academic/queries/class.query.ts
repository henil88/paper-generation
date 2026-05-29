import { db } from "@paper-generation/db";
import { classes, subjects } from "@paper-generation/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAllClassesQuery = async () => {
  return db.query.classes.findMany({
    orderBy: [asc(classes.displayOrder)],
  });
};

export const getClassByIdQuery = async (id: string) => {
  return db.query.classes.findFirst({
    where: eq(classes.id, id),
  });
};

export const getClassWithSubjectsQuery = async (id: string) => {
  return db.query.classes.findFirst({
    where: eq(classes.id, id),
    with: {
      subjects: true,
    },
  });
};

export const getSubjectByClassQuery = async (classId: string) => {
  return db.query.subjects.findMany({
    where: eq(subjects.classId, classId),
  });
};
