import { Navbar } from "@/components/layout/navbar";

import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import { EditNoteForm } from "@/components/notes/edit-note-form";

type EditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPage({
  params,
}: EditPageProps) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Edit Note
          </h1>

          <p className="text-muted-foreground mt-2">
            Update your note details.
          </p>
        </div>

        <EditNoteForm
          noteId={note.id}
          initialValues={{
            title: note.title,
            content: note.content,
            tags: note.tags.join(", "),
          }}
        />
      </main>
    </>
  );
}