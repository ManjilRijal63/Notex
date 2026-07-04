"use client";

import { createNote } from "@/actions/note-actions";
import {
  CreateNoteSchema,
  createNoteSchema,
} from "@/schemas/note-schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateNoteForm() {
  const [serverMessage, setServerMessage] =
    useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),

    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  async function onSubmit(
    values: CreateNoteSchema
  ) {
    setServerMessage("");

    const result = await createNote(values);

    if (result.error) {
      setServerMessage(result.error);
      return;
    }

    if (result.success) {
      setServerMessage(result.success);
      reset();
    }
  }

  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Create Note
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
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
            className="min-h-[140px]"
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
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          {isSubmitting
            ? "Creating..."
            : "Create Note"}
        </button>

        {serverMessage && (
          <p className="text-sm">
            {serverMessage}
          </p>
        )}
      </form>
    </div>
  );
}