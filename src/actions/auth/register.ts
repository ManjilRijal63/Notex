"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

import {
  RegisterSchema,
  RegisterInput,
} from "@/validators/register-schema";

export async function registerUser(
  data: RegisterInput
) {
  const validated =
    RegisterSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: "Invalid fields",
    };
  }

  const {
    name,
    email,
    password,
  } = validated.data;

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    return {
      error:
        "Email already registered",
    };
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success:
      "Account created successfully",
  };
}