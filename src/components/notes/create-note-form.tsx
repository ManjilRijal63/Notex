"use client";

import { createNote } from "@/actions/note-actions";

import { NoteForm } from "./note-form";

import { toast } from "sonner";

import { CreateNoteSchema } from "@/schemas/note-schema";

export function CreateNoteForm() {
  async function handleCreate(
    values: CreateNoteSchema
  ) {
    const result = await createNote(values);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result.success);
  }

  return (
    <NoteForm
      onSubmit={handleCreate}
      submitButtonText="Create Note"
    />
  );
}