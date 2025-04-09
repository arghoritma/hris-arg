"use server";

import { verifySession } from "@/libs/dal";
import { FormState, UserProp } from "@/libs/definitions";
import { db, schema } from "@/services/db";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

const { users } = schema;

export async function updateProfile(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Get form fields
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  // Validate phone number contains only digits
  if (!/^\d+$/.test(phone)) {
    return {
      errors: {
        phone: ["Phone number must contain only numbers."],
      },
    };
  }

  const session = await verifySession();

  try {
    // Prepare update data
    const updateData = {
      name: name,
      phone: phone,
      updated_at: new Date(),
    };

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, session.userId as string));

    revalidatePath("/dashboard/profile");
    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    return {
      errors: {
        _form: ["Failed to update profile. Please try again.", error as string],
      },
    };
  }
}

export async function getProfile(): Promise<{
  success: boolean;
  data: UserProp;
  error: Error | null;
}> {
  const session = await verifySession();

  try {
    const [user] = await db
      .select({
        name: users.name,
        email: users.email,
        phone: users.phone,
        avatar: users.avatar,
      })
      .from(users)
      .where(eq(users.id, session.userId as string));

    if (!user) {
      throw new Error("User not found");
    }

    return { success: true, data: user, error: null };
  } catch (error) {
    return {
      success: false,
      data: {} as UserProp,
      error:
        error instanceof Error ? error : new Error("Failed to fetch profile"),
    };
  }
}

export async function getAvatar(): Promise<{
  success: boolean;
  data: string;
  error: boolean;
}> {
  const session = await verifySession();
  if (!session.isAuth) {
    return {
      success: false,
      data: "unAuthorized",
      error: true,
    };
  }

  try {
    const [avatar] = await db
      .select({ avatar: users.avatar })
      .from(users)
      .where(eq(users.id, session.userId as string));

    return {
      success: true,
      data: avatar?.avatar || "",
      error: false,
    };
  } catch (error) {
    return {
      success: false,
      data: error as string,
      error: true,
    };
  }
}
