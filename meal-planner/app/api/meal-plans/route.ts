import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const mealPlan = await prisma.mealPlan.findFirst({
    where: { userId: session.user.id, isActive: true },
    include: { mealSlots: { include: { recipe: { include: { ingredients: true } } } } }
  });

  if (!mealPlan) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(mealPlan);
}

export async function POST(request: Request) {
  const body = await request.json();
  const mealPlan = await prisma.mealPlan.create({ data: body });
  return NextResponse.json(mealPlan, { status: 201 });
}
