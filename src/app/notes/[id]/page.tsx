import { Navbar } from "@/components/layout/navbar";
import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";
import Link from "next/link";

type NotePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NotePage({
  params,
}: NotePageProps) {
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

      <main className="max-w-4xl mx-auto px-6 py-10">
        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              {note.title}
            </h1>

            <div className="flex gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Created on{" "}
              {new Date(
                note.createdAt
              ).toLocaleDateString()}
            </p>

            
          </div>

          <div className="border-t pt-8">
            <p className="text-lg leading-8 whitespace-pre-wrap">
              {note.content}
            </p>
          </div>

          <Link
              href={`/notes/${note.id}/edit`}
              className="inline-block bg-black text-white px-4 py-2 rounded-lg"
            >
              Edit Note
            </Link>
        </article>
      </main>
    </>
  );
}