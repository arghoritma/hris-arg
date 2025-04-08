"use server"; // Menandakan bahwa ini adalah Server Action

import { writeFile } from "fs/promises";
import path from "path";
import { db, users, files } from "@/services/db";
import { eq } from "drizzle-orm";
import { verifySession } from "@/libs/dal";
import { generateUUID } from "@/libs/helper";
import { FormState } from "@/libs/definitions";

interface prevProp {
  error: boolean;
  data: string;
  success: boolean;
}

const storageUrl = process.env.STORAGE_URL!;
const storageRoot = process.env.STORAGE_ROOT!;

export async function uploadAvatar(
  prev: prevProp,
  formData: FormData
): Promise<prevProp> {
  try {
    const session = await verifySession();

    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return { success: false, error: true, data: "No file uploaded" };
    }

    // Konversi file ke buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer");

    // Format nama file
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `avatar_${session.userId}_${timestamp}${fileExtension}`;

    // Tentukan lokasi penyimpanan lokal
    const uploadDir = path.join(process.cwd(), `${storageRoot}/avatars`);
    const filePath = path.join(uploadDir, formattedFileName);
    console.log("Upload path:", filePath);

    // Simpan file ke sistem lokal
    await writeFile(filePath, buffer);
    console.log("File saved to local system");

    // Update avatar path in database
    await db
      .update(users)
      .set({
        avatar: `${storageUrl}/avatars/${formattedFileName}`,
        updated_at: new Date(),
      })
      .where(eq(users.id, session.userId as string));

    return {
      success: true,
      data: `File ${formattedFileName} uploaded successfully`,
      error: false,
    };
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return {
      success: false,
      data: `Error uploading file: ${
        error instanceof Error ? error.message : String(error)
      }`,
      error: true,
    };
  }
}
export async function uploadFile(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await verifySession();

    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file uploaded");
      return { errors: { _form: ["No file uploaded"] } };
    }

    // Konversi file ke buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("File converted to buffer");

    // Format nama file
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const formattedFileName = `file_${session.userId}_${timestamp}${fileExtension}`;

    // Tentukan lokasi penyimpanan lokal
    const uploadDir = path.join(process.cwd(), `${storageRoot}/files`);
    const filePath = path.join(uploadDir, formattedFileName);
    console.log("Upload path:", filePath);

    // Simpan file ke sistem lokal
    await writeFile(filePath, buffer);
    console.log("File saved to local system");

    // Insert file record into database
    await db.insert(files).values({
      id: generateUUID(),
      uploaded_by: session.userId as string,
      file_name: formattedFileName,
      file_url: `${storageUrl}/files/${formattedFileName}`,
      uploaded_at: new Date(),
    });

    return {
      success: true,
      message: `File ${formattedFileName} uploaded successfully`,
    };
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return {
      errors: {
        _form: [
          `Error uploading file: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ],
      },
    };
  }
}
