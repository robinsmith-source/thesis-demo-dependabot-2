import RecipeCard, { type RecipeCardProps } from "~/app/_components/RecipeCard";

export default function RecipeCardsSection({
  className,
  layout = "grid",
  recipes,
}: {
  className?: string;
  layout?: "grid" | "flex";
  recipes: RecipeCardProps[];
}) {
  return (
    <>
      {recipes.length === 0 ? (
        <h3 className="text-warning-300">Oh no, you&apos;ll starve!</h3>
      ) : (
        <section
          className={`${className} items-center justify-center gap-8 ${
        layout === "grid"
          ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "flex"
      }`}
        >
          {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </section>
      )}
    </>
  );
}