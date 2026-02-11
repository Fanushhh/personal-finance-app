'use client';

import { useQuery } from '@tanstack/react-query';

export function useRecipes(searchParams: string) {
  return useQuery({
    queryKey: ['recipes', searchParams],
    queryFn: async () => {
      const res = await fetch(`/api/recipes${searchParams ? `?${searchParams}` : ''}`);
      if (!res.ok) throw new Error('Nu s-au putut încărca rețetele.');
      return res.json();
    }
  });
}
