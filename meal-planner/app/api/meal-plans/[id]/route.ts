import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mealPlan = await prisma.mealPlan.findUnique({
    where: { id },
    include: { mealSlots: { include: { recipe: { include: { ingredients: true } } } } }
  });

  if (!mealPlan) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(mealPlan);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const mealPlan = await prisma.mealPlan.update({ where: { id }, data: body });
  return NextResponse.json(mealPlan);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.mealPlan.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
