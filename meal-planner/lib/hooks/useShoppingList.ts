'use client';

import { useQuery } from '@tanstack/react-query';

export function useShoppingList(mealPlanId?: string) {
  return useQuery({
    queryKey: ['shopping-list', mealPlanId],
    enabled: Boolean(mealPlanId),
    queryFn: async () => {
      const res = await fetch(`/api/shopping-list?mealPlanId=${mealPlanId}`);
      if (!res.ok) throw new Error('Nu s-a putut genera lista de cumpărături.');
      return res.json();
    }
  });
}
