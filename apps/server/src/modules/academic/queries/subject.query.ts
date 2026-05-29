import { db } from "@paper-generation/db";
import { subjects } from "@paper-generation/db/schema";
import { eq } from "drizzle-orm";

export const getSubjectByIdQuery = async (id: string) => {
  return db.query.subjects.findFirst({
    where: eq(subjects.id, id),
  });
};

export const getSubjectWithChaptersQuery = async (id: string) => {
  return db.query.subjects.findFirst({
    where: eq(subjects.id, id),
    with: {
      chapters: true,
    },
  });
};
