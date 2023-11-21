import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Unit } from "@prisma/client";

interface IngredientCreatorProps {
  stepIndex: number;
}

const IngredientCreator: React.FC<IngredientCreatorProps> = ({
  stepIndex,
}: IngredientCreatorProps) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `steps.${stepIndex}.ingredients`,
  });

  return (
    <>
      {fields.map((ingredient, index) => (
        <div key={ingredient.id} className="flex justify-center gap-4">
          <Controller
            control={control}
            name={`steps.${stepIndex}.ingredients.${index}.name`}
            render={({ field, fieldState }) => (
              <Input {...field} label="Name" />
            )}
          />

          <Controller
            control={control}
            name={`steps.${stepIndex}.ingredients.${index}.unit`}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                isRequired
                label="Unit"
                description="Select ingredient unit"
                variant="bordered"
                selectedKeys={[field.value]}
              >
                {[
                  "GRAM",
                  "KILOGRAM",
                  "LITER",
                  "MILLILITER",
                  "TEASPOON",
                  "TABLESPOON",
                  "CUP",
                  "PINCH",
                  "PIECE",
                ].map((ingredientUnit) => (
                  <SelectItem
                    key={ingredientUnit}
                    value={ingredientUnit as Unit}
                  >
                    {ingredientUnit as Unit}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name={`steps.${stepIndex}.ingredients.${index}.quantity`}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                onChange={(event) => {
                  field.onChange(+event.target.value);
                }}
                type="number"
                label="Quantity"
              />
            )}
          />

          <Button type="button" onClick={() => remove(index)}>
            -
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ name: "", quantity: 0, unit: "GRAM" })}
      >
        Add Ingredient
      </Button>
    </>
  );
};

export default IngredientCreator;
