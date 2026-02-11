import type { MealType, UserPreferences } from '@prisma/client';

import { prisma } from '@/lib/db';
import { getWeekRange } from '@/lib/utils/dateHelpers';

const mealTypes: MealType[] = ['BREAKFAST', 'LUNCH', 'DINNER'];

export async function generateMealPlan(userId: string, preferences?: UserPreferences | null) {
  const { weekStart, weekEnd } = getWeekRange();

  await prisma.mealPlan.updateMany({ where: { userId, isActive: true }, data: { isActive: false } });

  const mealPlan = await prisma.mealPlan.create({
    data: { userId, weekStart, weekEnd, isActive: true }
  });

  for (let day = 0; day < 7; day++) {
    for (const mealType of mealTypes) {
      const recipes = await prisma.recipe.findMany({
        where: {
          mealType,
          tags: preferences?.dietaryTags?.length ? { hasSome: preferences.dietaryTags } : undefined,
          ingredients: preferences?.excludedIngredients?.length
            ? { none: { name: { in: preferences.excludedIngredients } } }
            : undefined,
          prepTime: preferences?.maxPrepTime ? { lte: preferences.maxPrepTime } : undefined
        }
      });

      const recipe = recipes[Math.floor(Math.random() * recipes.length)] ?? null;
      if (!recipe) continue;

      await prisma.mealSlot.create({
        data: {
          mealPlanId: mealPlan.id,
          recipeId: recipe.id,
          dayOfWeek: day,
          mealType
        }
      });
    }
  }

  return prisma.mealPlan.findUnique({
    where: { id: mealPlan.id },
    include: {
      mealSlots: {
        include: { recipe: { include: { ingredients: true } } },
        orderBy: [{ dayOfWeek: 'asc' }, { mealType: 'asc' }]
      }
    }
  });
}
