"use client";
import { Button, Card, Textarea } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { RecipeReview } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import RatingInput from "./RatingInput";

export default function ReviewCreator({ recipeId }: { recipeId: string }) {
  const schema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string(),
  });

  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 1,
      comment: "",
    },
  });

  const router = useRouter();
  const mutation = api.review.create.useMutation({
    onSuccess: () => {
      toast.success("Review created!");
      reset({
        rating: 1,
        comment: "",
      });
      //TODO: This may be a hacky way to refresh the page, but it works for now. Consider using a better method like revalidatePath as a saw so far
      router.refresh();
    },
  });

  const onSubmit = (data: RecipeReview) => {
    mutation.mutate({
      rating: data.rating,
      comment: data.comment,
      recipeId: recipeId,
    });
  };

  return (
    <Card className="p-4">
      <form className="flex flex-col gap-4">
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <RatingInput
              value={field.value}
              onChange={(newValue: number) => field.onChange(newValue)}
            />
          )}
        />

        <Controller
          control={control}
          name="comment"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              minRows={3}
              isRequired
              label="Comment"
              placeholder="I really liked this recipe!"
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
    </Card>
  );
}
