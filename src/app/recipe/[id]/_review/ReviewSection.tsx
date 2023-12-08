import { api } from "~/trpc/server";
import ReviewCreator from "./ReviewCreator";
import React from "react";
import ReviewCard from "./ReviewCard";

export default async function ReviewSection({
  recipeId,
}: {
  recipeId: string;
}) {
  const reviews = await api.review.get.query({ recipeId });

  return (
    <>
      <ReviewCreator recipeId={recipeId} />
      {reviews && reviews.length > 0 && (
        <div className="mt-4 flex justify-center gap-2">
          {reviews.map((review) => (
            <ReviewCard review={review} key={review.id} />
          ))}
        </div>
      )}
    </>
  );
}
