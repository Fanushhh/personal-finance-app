'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';

type Recipe = { id: string; name: string };

export function SwapRecipeButton({ slotId, mealType, mealPlanId }: { slotId: string; mealType: string; mealPlanId: string }) {
  const [options, setOptions] = useState<Recipe[]>([]);

  const loadOptions = async () => {
    const res = await fetch(`/api/recipes/random?mealType=${mealType}&limit=5`);
    const data = await res.json();
    setOptions(data);
  };

  return (
    <Dialog triggerText="🔄" title="Schimbă rețeta">
      <div className="space-y-2">
        <Button onClick={loadOptions}>Încarcă alternative</Button>
        {options.map((recipe) => (
          <Button
            key={recipe.id}
            className="w-full bg-gray-100 text-gray-800"
            onClick={async () => {
              await fetch(`/api/meal-plans/${mealPlanId}/swap`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slotId, newRecipeId: recipe.id })
              });
              window.location.reload();
            }}
          >
            {recipe.name}
          </Button>
        ))}
      </div>
    </Dialog>
  );
}
