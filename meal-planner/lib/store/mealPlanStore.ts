'use client';

import { create } from 'zustand';

import type { MealSlotView } from '@/types';

type MealPlanStore = {
  slots: MealSlotView[];
  setSlots: (slots: MealSlotView[]) => void;
  swapSlotRecipe: (slotId: string, recipe: MealSlotView['recipe']) => void;
};

export const useMealPlanStore = create<MealPlanStore>((set) => ({
  slots: [],
  setSlots: (slots) => set({ slots }),
  swapSlotRecipe: (slotId, recipe) =>
    set((state) => ({
      slots: state.slots.map((slot) => (slot.id === slotId ? { ...slot, recipe } : slot))
    }))
}));
