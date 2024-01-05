"use client";

import { FaTag } from "react-icons/fa";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Chip,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type Label = {
  name: string;
  category: {
    name: string;
  };
};

type LabelCategory = {
  name: string;
};

export default function DifficultyInput({
  labels,
  categories,
}: {
  labels?: Label[];
  categories?: LabelCategory[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [labelInput, setLabelInput] = useState<string[]>([]);

  function handleLabelFilter(selectedLabels: string[]) {
    const params = new URLSearchParams(searchParams);
    selectedLabels && params.set("labels", selectedLabels.join());
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="ml-3 flex w-full flex-col flex-wrap items-center justify-start sm:flex-row">
      <Autocomplete
        size="sm"
        className="mb-4 mr-2 sm:mb-0 sm:w-1/3 md:w-1/4"
        startContent={<FaTag />}
        placeholder="Enter or select labels"
        onInputChange={(value: string) => {
          if (
            !labelInput.includes(value) &&
            value !== "" &&
            labels?.some((label) => label.name === value)
          ) {
            const newLabelInput = [...labelInput, value];
            setLabelInput(newLabelInput);
            handleLabelFilter(newLabelInput);
          }
        }}
      >
        {categories?.map((category) => (
          <AutocompleteSection
            showDivider
            className="font-bold"
            key={category.name}
            title={category.name}
          >
            {labels
              ?.filter((label) => label.category.name === category.name)
              .map((label) => (
                <AutocompleteItem key={label.name} className="text-foreground-400">
                  {label.name}
                </AutocompleteItem>
              )) ?? (
              <AutocompleteItem key="noElements">
                <span className="text-danger-500">No labels found!</span>
              </AutocompleteItem>
            )}
          </AutocompleteSection>
        )) ?? (
          <AutocompleteSection
            key="noSections"
            className="text-danger-500"
            title="No categories found!"
          >
            <AutocompleteItem key="noElements" className="text-danger-500">
              No labels found!
            </AutocompleteItem>
          </AutocompleteSection>
        )}
      </Autocomplete>
      <div className="flex flex-row flex-wrap items-center justify-start">
        {
          // for each label in labelInput, create a chip that can be removed
          labelInput.map((label) => (
            <Chip
              variant="solid"
              key={label}
              className="m-1"
              onClose={() => {
                const newLabelInput = labelInput.filter(
                  (input) => input !== label,
                );
                setLabelInput(newLabelInput);
                handleLabelFilter(newLabelInput);
              }}
            >
              {label}
            </Chip>
          ))
        }
      </div>
    </div>
  );
}
