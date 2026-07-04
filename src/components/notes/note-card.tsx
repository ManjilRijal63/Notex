import Link from "next/link";

type NoteCardProps = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
};

export function NoteCard({
  id,
  title,
  content,
  tags,
  createdAt,
}: NoteCardProps) {
  return (
    <Link href={`/notes/${id}`}>
      <div className="border rounded-xl p-5 hover:shadow-md transition space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">
            {title}
          </h2>

          <p className="text-muted-foreground line-clamp-2">
            {content}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
}