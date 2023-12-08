import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        rating: z.number().min(1).max(5),
        comment: z.string().nullable(),
        recipeId: z.string().cuid(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return ctx.db.recipeReview.create({
        data: {
          rating: input.rating,
          comment: input.comment,
          recipe: { connect: { id: input.recipeId } },
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        recipeId: z.string().cuid(),
      }),
    )
    .query(({ input, ctx }) => {
      return ctx.db.recipeReview.findMany({
        where: { recipeId: input.recipeId },
        include: { author: true },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.recipeReview.delete({
        where: {
          id: input.id,
          authorId: ctx.session.user.id,
        },
      });
    }),
});
