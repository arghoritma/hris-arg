import "server-only";
import { eq } from "drizzle-orm";
import { SignJWT, jwtVerify } from "jose";
import { db, schema } from "@/services/db";
import { generateUUID } from "./helper";
import { headers, cookies } from "next/headers";

const { sessions } = schema;

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: { id: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session,", error);
  }
}

export async function createSession(user_id: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const headersList = await headers();

  const data = await db
    .insert(sessions)
    .values({
      id: generateUUID(),
      userId: user_id,
      token: "",
      device: headersList.get("user-agent") || "",
      ipAddress:
        headersList.get("x-forwarded-for") ||
        headersList.get("x-real-ip") ||
        "",
      userAgent: headersList.get("user-agent") || "",
      createdAt: new Date(),
      lastAccessed: new Date(),
      isActive: true,
      expiresAt: expiresAt,
    })
    .returning();

  const sessionId = data[0].id;
  const session = await encrypt({ id: sessionId });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (session && payload) {
    await db
      .update(sessions)
      .set({ isActive: false })
      .where(eq(sessions.id, (payload as { id: string }).id));
  }

  const cookieStore = await cookies();
  cookieStore.delete("session");
}
