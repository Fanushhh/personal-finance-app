import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateMealPlan } from '@/lib/utils/generateMealPlan';

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const preferences = await prisma.userPreferences.findUnique({ where: { userId: session.user.id } });
  const mealPlan = await generateMealPlan(session.user.id, preferences);

  return NextResponse.json(mealPlan, { status: 201 });
}
