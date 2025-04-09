"use server";

import { FormState } from "@/libs/definitions";
import { generateUUID } from "@/libs/helper";
import { db, schema } from "@/services/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/libs/sessions";
import { redirect } from "next/navigation";
import { GoogleSigninPayload } from "@/types";

const { users } = schema;

export async function signup(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      errors: {
        _form: ["Please fill all required fields"],
      },
    };
  }

  try {
    // Check if email already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      console.log("Email already exists");
      return {
        errors: {
          email: ["Email already exists"],
        },
      };
    }

    // Generate unique ID for the user
    const userId = generateUUID();

    // Insert user
    await db.insert(users).values({
      id: userId,
      email: email,
      name: name,
      role: "user",
      passwordHash: await bcrypt.hash(password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await createSession(userId);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (
        error.message.includes("unique constraint") ||
        error.message.includes("duplicate key")
      ) {
        return {
          errors: {
            email: ["This email is already registered"],
          },
        };
      }

      if (error.message.includes("password")) {
        return {
          errors: {
            password: ["Password processing failed"],
          },
        };
      }
    }

    return {
      errors: {
        _form: ["Failed to create account. Please try again."],
      },
    };
  }
}
export async function signin(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      errors: {
        _form: ["Please provide both email and password"],
      },
    };
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return {
        errors: {
          _form: ["User not found"],
        },
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return {
        errors: {
          _form: ["Invalid credentials"],
        },
      };
    }

    await createSession(user.id);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      errors: {
        _form: ["An error occurred during sign in. Please try again."],
      },
    };
  }
}

export async function googleSignin(
  payload: GoogleSigninPayload
): Promise<FormState> {
  const { email, name, uid, Avatar } = payload;
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!existingUser) {
      await db.insert(users).values({
        id: uid,
        email,
        name: name,
        passwordHash: uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        avatar: Avatar,
      });
    }
    await createSession(uid);
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return {
      errors: {
        _form: ["An error occurred during Google sign-in. Please try again."],
      },
    };
  }
}
export async function logout() {
  deleteSession();
  redirect("/auth/login");
}
