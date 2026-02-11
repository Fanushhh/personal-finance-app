import { RecipeFilters } from '@/components/recipes/RecipeFilters';
import { RecipeGrid } from '@/components/recipes/RecipeGrid';
import { prisma } from '@/lib/db';

export default async function RecipesPage({ searchParams }: { searchParams: Promise<{ mealType?: string }> }) {
  const { mealType } = await searchParams;
  const recipes = await prisma.recipe.findMany({
    where: mealType ? { mealType: mealType as any } : undefined,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Rețete</h1>
      <RecipeFilters />
      <RecipeGrid recipes={recipes} />
    </section>
  );
}
