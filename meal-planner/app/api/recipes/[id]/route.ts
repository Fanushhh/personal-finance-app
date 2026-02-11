import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { id }, include: { ingredients: true } });
  if (!recipe) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(recipe);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const recipe = await prisma.recipe.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description,
      imageUrl: body.imageUrl,
      prepTime: body.prepTime,
      cookTime: body.cookTime,
      servings: body.servings,
      mealType: body.mealType,
      tags: body.tags,
      difficulty: body.difficulty,
      instructions: body.instructions
    }
  });

  return NextResponse.json(recipe);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.recipe.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
