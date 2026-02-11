'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Select } from '@/components/ui/Select';

export function RecipeFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Select
        defaultValue={searchParams.get('mealType') ?? ''}
        onChange={(e) => router.push(`/recipes?mealType=${e.target.value}`)}
      >
        <option value="">Toate mesele</option>
        <option value="BREAKFAST">Breakfast</option>
        <option value="LUNCH">Lunch</option>
        <option value="DINNER">Dinner</option>
      </Select>
    </div>
  );
}
