import { db } from "@paper-generation/db";
import { chapters } from "@paper-generation/db/schema";
import { eq } from "drizzle-orm";

export const getChapterByIdQuery = async (id: string) => {
  return db.query.chapters.findFirst({
    where: eq(chapters.id, id),
  });
};
