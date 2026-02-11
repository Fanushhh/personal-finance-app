import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mealType = searchParams.get('mealType');
  const limit = Number(searchParams.get('limit') ?? '5');
  const excludeId = searchParams.get('excludeId');

  const recipes = await prisma.recipe.findMany({
    where: {
      mealType: mealType ? (mealType as any) : undefined,
      id: excludeId ? { not: excludeId } : undefined
    }
  });

  const shuffled = recipes.sort(() => Math.random() - 0.5).slice(0, limit);
  return NextResponse.json(shuffled);
}
