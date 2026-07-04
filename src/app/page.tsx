import { prisma } from "@/lib/prisma";
import { createSampleNote } from "@/actions/note-actions";

export default async function HomePage() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notex Lite</h1>

        <form action={createSampleNote}>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Create Sample Note
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <h2 className="text-xl font-semibold">
              {note.title}
            </h2>

            <p className="text-muted-foreground">
              {note.content}
            </p>

            <div className="flex gap-2 flex-wrap">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}