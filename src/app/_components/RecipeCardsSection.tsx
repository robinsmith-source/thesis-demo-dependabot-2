import RecipeCard from "~/app/_components/RecipeCard";
import { RecipeDifficulty } from "@prisma/client";

interface RecipeCardSectionProps {
  className?: string;
  recipes: {
    id: string;
    name: string;
    difficulty: RecipeDifficulty;
    labels: {
      name: string;
    }[];
    images: string[];
  }[];
}

export default function RecipeCardsSection({
  className,
  recipes,
}: RecipeCardSectionProps) {
  return (
    <section
      className={`${className} flex flex-wrap items-center justify-center gap-8`}
    >
      {recipes &&
        recipes.map((recipe) => <RecipeCard recipe={recipe} key={recipe.id} />)}
    </section>
  );
}
