import Link from 'next/link';

import { Card } from '@/components/ui/Card';

export function RecipeGrid({ recipes }: { recipes: { id: string; name: string; mealType: string; tags: string[] }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {recipes.map((recipe) => (
        <Card key={recipe.id}>
          <h3 className="font-semibold">{recipe.name}</h3>
          <p className="text-sm text-gray-500">{recipe.mealType}</p>
          <p className="mb-3 text-xs text-gray-400">{recipe.tags.join(', ')}</p>
          <Link href={`/recipes/${recipe.id}`} className="text-sm font-medium text-primary">Detalii</Link>
        </Card>
      ))}
    </div>
  );
}
