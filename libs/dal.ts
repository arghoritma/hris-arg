import "server-only";

import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { decrypt } from "@/libs/sessions";
import { cache } from "react";
import { db, schema } from "@/services/db";

const { sessions } = schema;

export const verifySession = cache(async () => {
  const header = (await headers()).get("X-User-Session");
  const cookie = (await cookies()).get("session")?.value;
  const sessionValue = header || cookie;
  const session = await decrypt(sessionValue);

  if (!session?.id) {
    if (header) {
      return { isAuth: false };
    }
    return { isAuth: false };
  }

  const user = await db
    .select({ userId: sessions.userId })
    .from(sessions)
    .where(eq(sessions.id, session.id as string))
    .execute();

  if (!user?.[0]) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: user[0]?.userId };
});
