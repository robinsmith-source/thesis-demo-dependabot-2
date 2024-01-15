import { api } from "~/trpc/server";

import AdvancedRecipeSearch from "~/app/_components/search/AdvancedRecipeSearch";
import FilterAccordion from "~/app/_components/search/FilterAccordion";
import RecipeCardsSection from "~/app/_components/RecipeCardsSection";
import QueryPagination from "~/app/_components/search/QueryPagination";

type urlParams = {
  name?: string;
  labels?: string;
  difficulty?: number;
  take?: number;
  page?: number;
};

type apiParams = {
  take?: number;
  skip?: number;
  name?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD" | "EXPERT";
  labels?: string[];
};

// translate parameters
const createQueryParams = (params: urlParams) => {
  const { name, labels, difficulty, take, page } = params;
  const queryParameters: apiParams = { take: take ?? 4 };

  if (name) queryParameters.name = name;
  if (labels) queryParameters.labels = labels.split(",");
  if (difficulty) {
    const numericDifficulty = Number(difficulty);
    switch (numericDifficulty) {
      case 1:
        queryParameters.difficulty = "EASY";
        break;
      case 2:
        queryParameters.difficulty = "MEDIUM";
        break;
      case 3:
        queryParameters.difficulty = "HARD";
        break;
      case 4:
        queryParameters.difficulty = "EXPERT";
        break;
    }
  }
  if (page) {
    queryParameters.skip = (page - 1) * (queryParameters.take ?? 0);
  }

  return queryParameters;
};

export default async function Page({
  searchParams,
}: {
  searchParams?: urlParams;
}) {
  // get all labels and categories from DB for select items and turn them to string arrays
  const categories = await api.recipeLabelCategory.getAll.query();


  const queryParameters = createQueryParams(searchParams ?? {});
  const displayedRecipeCards =
    await api.recipe.getRecipeCards.query(queryParameters);

  // calculate page count for pagination
  const count = await api.recipe.getRecipeCount.query(queryParameters);
  const pageCount = Math.ceil(Number(count) / (queryParameters.take ?? 0));

  return (
    <main className="flex flex-col items-center">
      <AdvancedRecipeSearch />
      <FilterAccordion categories={categories} />
      <RecipeCardsSection recipes={displayedRecipeCards} />
      <QueryPagination pageCount={pageCount} className="mt-2" />
    </main>
  );
}
