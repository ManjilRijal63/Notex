"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateNote } from "@/actions/note-actions";
import { NoteForm } from "./note-form";
import { CreateNoteSchema } from "@/schemas/note-schema";

type EditNoteFormProps = {
  noteId: string;
  initialValues: CreateNoteSchema;
};

export function EditNoteForm({
  noteId,
  initialValues,
}: EditNoteFormProps) {
  const router = useRouter();

  async function handleUpdate(
    values: CreateNoteSchema
  ) {
    const result = await updateNote(
      noteId,
      values
    );

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(result.success);

    router.replace("/"); // this is instead of router.push("/") because we want to replace the current page in the history stack, so that the user cannot go back to the edit page after updating the note.
  }

  return (
    <NoteForm
      defaultValues={initialValues}
      onSubmit={handleUpdate}
      submitButtonText="Update Note"
    />
  );
}