"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

type SearchBarProps = {
  initialSearch?: string;
};

export function SearchBar({
  initialSearch = "",
}: SearchBarProps) {
  const [search, setSearch] =
    useState(initialSearch);

  const router = useRouter();

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!search.trim()) {
      router.push("/");
      return;
    }

    router.push(
      `/?search=${encodeURIComponent(
        search
      )}`
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2"
    >
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border rounded-lg px-4 py-2 w-full"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Search
      </button>
    </form>
  );
}