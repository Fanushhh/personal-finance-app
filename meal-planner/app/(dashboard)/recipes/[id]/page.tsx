import { notFound } from 'next/navigation';

import { RecipeDetailView } from '@/components/recipes/RecipeDetailView';
import { prisma } from '@/lib/db';

export default async function RecipeDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { id }, include: { ingredients: true } });
  if (!recipe) notFound();
  return <RecipeDetailView recipe={recipe} />;
}
