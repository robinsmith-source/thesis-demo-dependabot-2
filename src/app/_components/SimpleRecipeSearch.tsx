"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";

type queryInput =
  | Partial<{
      name?: string;
    }>
  | undefined;

export default function SimpleRecipeSearch() {
  usePathname();
  const router = useRouter();

  // search parameters
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<queryInput>();

  function handleInputSubmit(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  }

  function handleSearch(searchFilters: queryInput) {
    const params = new URLSearchParams(searchParams);

    if (searchFilters) {
      const { name } = searchFilters;
      name && params.set("name", name ?? "");
    }

    router.push(`/recipe/search?${params.toString()}`);
  }

  return (
    <div className="flex w-full flex-row-reverse justify-end">
      <Input
        fullWidth
        type="text"
        defaultValue={searchParams.get("name")?.toString()}
        placeholder="Search recipes..."
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const name = event.target.value;
          setSearchQuery((prevQuery) => ({ ...prevQuery, name }));
        }}
        onKeyDown={handleInputSubmit}
        description={
          <Link
            as={NextLink}
            href="/recipe/search"
            className="text-secondary-200"
            size="sm"
          >
            <a>Advanced</a>
          </Link>
        }
        endContent={
          <Button
            onClick={() => handleSearch(searchQuery)}
            endContent={<FaMagnifyingGlass size={30} />}
          >
            Search
          </Button>
        }
      />
    </div>
  );
}
