"use client";

import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import DifficultyInput from "./DifficultyInput";
import LabelSelect from "./LabelSelect";

type FilterAccordionProps = {
  categories: { name: string; RecipeLabel: { name: string; }[]; }[];
  className?: string;
};

export default function FilterAccordion({
  categories,
  className = "w-full mb-2",
}: FilterAccordionProps) {
  return (
    <Accordion className={className} variant="light" hideIndicator>
      <AccordionItem key="filters" aria-label="filters" title="Search Filters">
        <div className="flex w-full flex-col flex-wrap items-start justify-start">
          <div>
            <span className="font-bold text-default-600">Labels</span>
            <LabelSelect categories={categories} />
          </div>
          <div>
            <span className="font-bold text-default-600">Difficulty</span>
            <Card>
              <DifficultyInput />
            </Card>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
