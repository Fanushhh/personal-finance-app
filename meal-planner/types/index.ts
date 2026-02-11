import type { MealType, Recipe } from '@prisma/client';

export type MealSlotView = {
  id: string;
  dayOfWeek: number;
  mealPlanId: string;
  mealType: MealType;
  recipe: Recipe & {
    ingredients: { id: string; name: string; amount: number; unit: string; category: string | null }[];
  };
};

export type ShoppingListItem = {
  name: string;
  amount: number;
  unit: string;
};

export type ShoppingListCategory = {
  name: string;
  items: ShoppingListItem[];
};

export type ShoppingListResponse = {
  categories: ShoppingListCategory[];
};
