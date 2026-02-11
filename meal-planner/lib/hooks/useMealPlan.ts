'use client';

import { useQuery } from '@tanstack/react-query';

export function useMealPlan() {
  return useQuery({
    queryKey: ['meal-plan'],
    queryFn: async () => {
      const res = await fetch('/api/meal-plans');
      if (!res.ok) throw new Error('Nu s-a putut încărca planul.');
      return res.json();
    }
  });
}
