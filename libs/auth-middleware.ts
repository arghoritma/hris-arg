/* eslint-disable @typescript-eslint/no-unused-vars */
import { jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET || "";
const encodedKey = new TextEncoder().encode(secretKey);

export async function verifyAuth(session: string | undefined) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
