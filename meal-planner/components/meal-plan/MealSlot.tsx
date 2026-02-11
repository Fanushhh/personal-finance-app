'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import type { MealSlotView } from '@/types';

import { SwapRecipeButton } from '@/components/meal-plan/SwapRecipeButton';

const colors = {
  BREAKFAST: 'border-l-4 border-[#10b981]',
  LUNCH: 'border-l-4 border-[#f97316]',
  DINNER: 'border-l-4 border-[#3b82f6]'
};

export function MealSlot({ slot }: { slot: MealSlotView }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`rounded-lg bg-white p-3 shadow-sm ${colors[slot.mealType]}`}>
      <img src={slot.recipe.imageUrl ?? 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400'} alt={slot.recipe.name} className="mb-2 h-24 w-full rounded object-cover" />
      <h4 className="font-medium">{slot.recipe.name}</h4>
      <p className="text-xs text-gray-500">{slot.recipe.prepTime + slot.recipe.cookTime} min</p>
      <div className="mt-2 flex items-center gap-2">
        <SwapRecipeButton slotId={slot.id} mealType={slot.mealType} mealPlanId={slot.mealPlanId} />
        <Link href={`/recipes/${slot.recipe.id}`} className="rounded-md border px-2 py-1 text-xs">👁️</Link>
      </div>
    </motion.div>
  );
}
