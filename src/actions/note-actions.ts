"use server";

import { prisma } from "@/lib/prisma";
import {
  createNoteSchema,
  CreateNoteSchema,
} from "@/schemas/note-schema";

import { revalidatePath } from "next/cache";

export async function createNote(
  values: CreateNoteSchema
) {
  const validatedFields =
    createNoteSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { title, content, tags } =
    validatedFields.data;

  await prisma.note.create({
    data: {
      title,
      content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    },
  });


  revalidatePath("/");

  return {
    success: "Note created successfully",
  };
}



//edit logic
export async function updateNote(
  id: string,
  values: CreateNoteSchema
) {
  const validatedFields =
    createNoteSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { title, content, tags } =
    validatedFields.data;

  await prisma.note.update({
    where: {
      id,
    },

    data: {
      title,
      content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    },
  });

  revalidatePath("/");
  revalidatePath(`/notes/${id}`);

  return {
    success: "Note updated successfully",
  };
}


//delete logic 

export async function deleteNote(
  id: string
) {
  await prisma.note.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");

  return {
    success: "Note deleted successfully",
  };
}