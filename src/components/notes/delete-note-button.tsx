"use client";

import { deleteNote } from "@/actions/note-actions";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useRouter } from "next/navigation";

type DeleteNoteButtonProps = {
  noteId: string;
};

export function DeleteNoteButton({
  noteId,
}: DeleteNoteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteNote(noteId);

    toast.success(result.success);

    router.push("/");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Delete Note
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this note?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}