/*
  Warnings:

  - The `unit` column on the `RecipeStepIngredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAM', 'KILOGRAM', 'LITER', 'MILLILITER', 'TEASPOON', 'TABLESPOON', 'CUP', 'PINCH', 'PIECE');

-- AlterTable
ALTER TABLE "RecipeStepIngredient" DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit";
