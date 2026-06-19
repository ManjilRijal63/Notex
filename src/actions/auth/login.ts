"use server";

import { signIn } from "@/auth";

import {
  LoginInput,
  LoginSchema,
} from "@/validators/login-schema";

export async function loginUser(
  data: LoginInput
) {
  const validated =
    LoginSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: "Invalid fields",
    };
  }

  const {
    email,
    password,
  } = validated.data;

  try {
    await signIn(
      "credentials",
      {
        email,
        password,
        redirectTo: "/",
      }
    );

    return {
      success: true,
    };
  } catch {
    return {
      error:
        "Invalid credentials",
    };
  }
}