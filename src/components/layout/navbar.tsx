import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          Notex Lite
        </Link>

        <p className="text-sm text-muted-foreground">
          Modern Notes App
        </p>
      </div>
    </header>
  );
}