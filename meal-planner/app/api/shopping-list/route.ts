import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { aggregateIngredients } from '@/lib/utils/aggregateIngredients';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mealPlanId = searchParams.get('mealPlanId');
  if (!mealPlanId) return NextResponse.json({ message: 'mealPlanId required' }, { status: 400 });

  const mealPlan = await prisma.mealPlan.findUnique({
    where: { id: mealPlanId },
    include: { mealSlots: { include: { recipe: { include: { ingredients: true } } } } }
  });

  if (!mealPlan) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  const ingredients = mealPlan.mealSlots.flatMap((slot) => slot.recipe.ingredients);
  return NextResponse.json(aggregateIngredients(ingredients));
}
