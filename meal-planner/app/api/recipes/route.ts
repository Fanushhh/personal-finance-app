import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mealType = searchParams.get('mealType');
  const search = searchParams.get('search');

  const recipes = await prisma.recipe.findMany({
    where: {
      mealType: mealType ? (mealType as any) : undefined,
      OR: search
        ? [
            { name: { contains: search, mode: 'insensitive' } },
            { ingredients: { some: { name: { contains: search, mode: 'insensitive' } } } }
          ]
        : undefined
    },
    include: { ingredients: true }
  });

  return NextResponse.json(recipes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const recipe = await prisma.recipe.create({
    data: {
      ...body,
      ingredients: { create: body.ingredients ?? [] }
    },
    include: { ingredients: true }
  });

  return NextResponse.json(recipe, { status: 201 });
}
