import { test, expect } from "../playwright/fixtures";

test("Should create a empty shopping list and make sure it gets created", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/shopping-list");
  await page
    .locator("div")
    .filter({ hasText: /^Shopping Lists$/ })
    .getByRole("button")
    .click();
  await page.getByPlaceholder("My shopping list", { exact: true }).click();
  await page
    .getByPlaceholder("My shopping list", { exact: true })
    .fill("ShoppingList1");
  await page.getByPlaceholder("This is my shopping list").click();
  await page.getByPlaceholder("This is my shopping list").fill("Description");
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByRole("heading", { name: "ShoppingList1" })
    .first()
    .isVisible();
  await expect(page.locator(".text-left").first()).toContainText("Description");
  await expect(page.locator(".relative > p").first()).toContainText(
    "No items in this shopping list",
  );
});
test("Should create a shopping list with all recipe ingredients and make sure it gets created", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Explore Recipes" }).click();
  await page.getByRole("button", { name: "Spaghetti Aglio e Olio" }).click();
  await page.waitForURL(/\/recipe\/c[a-z0-9]{24}/);
  await page
    .locator("div")
    .filter({ hasText: /^Shopping ListSelect ingredients$/ })
    .getByRole("button")
    .nth(2)
    .click();
  await page.getByPlaceholder("My shopping list", { exact: true }).click();
  await page
    .getByPlaceholder("My shopping list", { exact: true })
    .fill("ShoppingList1");
  await page.getByPlaceholder("This is my shopping list").click();
  await page.getByPlaceholder("This is my shopping list").fill("Description");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByPlaceholder("Choose a shopping list").click();
  await page.getByPlaceholder("Choose a shopping list").fill("ShoppingList2");
  await page
    .getByRole("option", { name: "ShoppingList1", exact: true })
    .first()
    .click();
  await page.getByLabel("Select All").click();
  await page
    .getByRole("button", { name: "Add Ingredients to shopping" })
    .click();

  await page.waitForURL(/\/shopping-list/);
  expect(
    page.getByRole("heading", { name: "ShoppingList2" }).first().isVisible(),
  );
  await expect(page.locator(".text-left").first()).toContainText("Description");
  await expect(page.locator(".relative > p").first()).toContainText(
    "Add ItemsRemove ItemsAmountIngredient2 tspSalt300 gSpaghetti4 tbspOlive Oil4 Garlic cloves1 tspRed Pepper Flakes1 tbspParsley1 tspPepper",
  );
});
