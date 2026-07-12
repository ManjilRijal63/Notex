"use client";

import {
  CreateNoteSchema,
  createNoteSchema,
} from "@/schemas/note-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type NoteFormProps = {
  defaultValues?: CreateNoteSchema;

  onSubmit: (
    values: CreateNoteSchema
  ) => Promise<void>;

  submitButtonText: string;
};

export function NoteForm({
  defaultValues,
  onSubmit,
  submitButtonText,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    reset,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateNoteSchema>({
    resolver: zodResolver(
      createNoteSchema
    ),

    defaultValues: defaultValues ?? {
      title: "",
      content: "",
      tags: "",
    },
  });

  async function handleFormSubmit(
    values: CreateNoteSchema
  ) {
    try {
      await onSubmit(values);

      if (!defaultValues) {
        reset();
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="border rounded-xl p-6">
      <form
        onSubmit={handleSubmit(
          handleFormSubmit
        )}
        className="space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Title
          </label>

          <Input
            placeholder="Enter note title"
            {...register("title")}
          />

          {errors.title && (
            <p className="text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Content
          </label>

          <Textarea
            placeholder="Write your note..."
            className="min-h-[160px]"
            {...register("content")}
          />

          {errors.content && (
            <p className="text-sm text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Tags
          </label>

          <Input
            placeholder="react,nextjs,prisma"
            {...register("tags")}
          />

          <p className="text-xs text-muted-foreground">
            Separate tags with commas
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {isSubmitting
            ? "Submitting..."
            : submitButtonText}
        </button>
      </form>
    </div>
  );
}