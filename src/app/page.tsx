import { Navbar } from "@/components/layout/navbar";
import { CreateNoteForm } from "@/components/notes/create-note-form";
import { NoteCard } from "@/components/notes/note-card";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Your Notes
          </h1>

          <p className="text-muted-foreground mt-2">
            Organize your thoughts beautifully.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <CreateNoteForm />

          <div className="space-y-4">
            {notes.length === 0 ? (
              <div className="border rounded-xl p-10 text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  No notes yet
                </h2>

                <p className="text-muted-foreground">
                  Create your first note.
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  content={note.content}
                  tags={note.tags}
                  createdAt={note.createdAt}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}