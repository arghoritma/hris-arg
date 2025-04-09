"use server";

import { db, schema } from "@/services/db";
import { desc } from "drizzle-orm";

const { files } = schema;

export async function getFiles() {
  try {
    const fileList = await db
      .select()
      .from(files)
      .orderBy(desc(files.uploadedAt));

    return { success: true, data: fileList };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch files";
    return { success: false, error: errorMessage };
  }
}
