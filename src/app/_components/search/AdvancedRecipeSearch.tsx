"use client";

import {
  Button,
  Card,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import DifficultyInput from "./DifficultyInput";
import LabelSelect from "./LabelSelect";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type AdvancedRecipeSearchProps = {
  categories: { name: string; RecipeLabel: { name: string }[] }[];
};

export default function AdvancedRecipeSearch({
  categories,
}: AdvancedRecipeSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width < 640);
    };
    
    window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  const [filtersCollapsed, setFiltersCollapsed] = useState(true);

  const handleSearch = ({
    name,
    sort,
    size,
  }: { name?: string; sort?: string; size?: string } = {}) => {
    const params = new URLSearchParams(searchParams);

    // reset page
    if (params.get("page") !== "1") {
      params.set("page", "1");
    }

    name ? params.set("name", name) : params.delete("name");
    sort ? params.set("order", sort) : params.delete("order");
    if (size) {
      params.set("pageSize", size);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleInput = useDebouncedCallback(
    (value: string) => {
      handleSearch({ name: value });
    },
    333, // delay in ms
  );

  return (
    <div className="mb-3 w-full justify-center">
      <Card>
        <div className="m-2 flex flex-row items-center justify-between space-x-2">
          <Button
            size="lg"
            variant="flat"
            color="secondary"
            startContent={<FaFilter className="hidden sm:inline" />}
            isIconOnly={isSmallScreen}
            onClick={() => setFiltersCollapsed(!filtersCollapsed)}
          >
            <span className="hidden md:inline">Filters</span>
            <FaFilter className="md:hidden" />
          </Button>
          <Input
            type="text"
            className="w-1/2"
            defaultValue={searchParams.get("name") ?? ""}
            startContent={<FaMagnifyingGlass className="mr-1" />}
            placeholder="Search recipes"
            onValueChange={(value: string) => handleInput(value)}
          />
          <span className="whitespace-nowrap font-light">Sort By</span>
          <Select
            fullWidth={false}
            size="sm"
            className="w-32"
            selectionMode="single"
            defaultSelectedKeys={searchParams.get("order") ?? ""}
            onSelectionChange={(value) =>
              handleSearch({ sort: Array.from(value)[0]?.toString() ?? "" })
            }
          >
            <SelectItem key="NEWEST" value="newest">
              newest
            </SelectItem>
            <SelectItem key="OLDEST" value="oldest">
              oldest
            </SelectItem>
          </Select>
          <span className="whitespace-nowrap font-light">Items per page</span>
          <Select
            fullWidth={false}
            size="sm"
            className="w-24"
            selectionMode="single"
            defaultSelectedKeys={searchParams.get("pageSize") ?? "12"}
            onSelectionChange={(value) =>
              handleSearch({ size: Array.from(value)[0]?.toString() ?? "" })
            }
          >
            <SelectItem key="4" value="4">
              4
            </SelectItem>
            <SelectItem key="6" value="6">
              6
            </SelectItem>
            <SelectItem key="12" value="12">
              12
            </SelectItem>
          </Select>
        </div>
        <motion.div
          className={
            !filtersCollapsed
              ? "mx-4 my-2 flex flex-col items-start justify-between lg:flex-row lg:items-center"
              : ""
          }
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: !filtersCollapsed ? 1 : 0,
            height: !filtersCollapsed ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex w-full flex-col">
            <Divider className="w-full bg-background-400" />
            <div className="mt-2 flex w-full flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start md:w-1/2">
                <span className="font-bold text-default-600">Difficulty</span>
                <DifficultyInput />
              </div>
              <div className="mr-5 flex flex-row items-center justify-start md:w-1/2">
                <span className="font-bold text-default-600">Labels</span>
                <LabelSelect
                  categories={categories}
                  disabled={filtersCollapsed}
                  className="w-full lg:ml-2 lg:w-2/3"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
