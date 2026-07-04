"use server";

import { prisma } from "@/lib/prisma";

export async function createSampleNote() {
  const note = await prisma.note.create({
    data: {
      title: "My First Note ever",
      content: "This is my very first note using Prisma. ok",
      tags: ["nextjs", "prisma"],
    },
  });

  return note;
}