import RecipeCard from "~/app/_components/RecipeCard";
import { type RouterOutputs } from "~/trpc/shared";

export default function RecipeCardsSection({
  className,
  layout = "grid",
  recipes,
}: {
  className?: string;
  layout?: "grid" | "flex";
  recipes: RouterOutputs["recipe"]["getCards"];
}) {
  return (
    <>
      {recipes.length === 0 ? (
        <section className="flex w-full justify-center items-center">
          <h3 className="text-warning-300">Oh no, you&apos;ll starve!</h3>
        </section>
      ) : (
        <section
      className={`${className} w-full place-items-center justify-center gap-8 ${
        layout === "grid"
          ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "flex flex-wrap"
      }`}
        >
          {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </section>
      )}
    </>
  );
}