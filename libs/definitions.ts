import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .trim(),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Phone number must contain only numbers." })
    .trim(),
});

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    phone?: string[];
    _form?: string[];
  };
  success?: boolean;
  message?: string;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export type ProfileResponse = {
  success: boolean;
  data: {
    username: string;
    email: string;
    phone_number: string | null;
    avatar: string | null;
  } | null;
  errors?: {
    _form?: string[];
  };
};

export type UserProp = {
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
};
