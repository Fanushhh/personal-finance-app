import type { MealSlotView } from '@/types';

import { Card } from '@/components/ui/Card';

export function RecipeCard({ slot }: { slot: MealSlotView }) {
  return (
    <Card>
      <h3 className="font-semibold">{slot.recipe.name}</h3>
      <p className="text-sm text-gray-600">{slot.recipe.prepTime + slot.recipe.cookTime} min</p>
    </Card>
  );
}
