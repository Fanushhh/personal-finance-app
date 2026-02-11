import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json();
  const { id } = await params;

  const slot = await prisma.mealSlot.findUnique({ where: { id: body.slotId } });
  if (!slot || slot.mealPlanId !== id) return NextResponse.json({ message: 'Slot invalid' }, { status: 404 });

  const newRecipe = await prisma.recipe.findUnique({ where: { id: body.newRecipeId } });
  if (!newRecipe || newRecipe.mealType !== slot.mealType) {
    return NextResponse.json({ message: 'Recipe meal type mismatch' }, { status: 400 });
  }

  const updated = await prisma.mealSlot.update({
    where: { id: body.slotId },
    data: { recipeId: body.newRecipeId },
    include: { recipe: true }
  });

  return NextResponse.json(updated);
}
