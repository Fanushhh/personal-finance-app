import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { WeeklyGrid } from '@/components/meal-plan/WeeklyGrid';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export default async function PlanPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/login');

  const mealPlan = await prisma.mealPlan.findFirst({
    where: { userId: session.user.id, isActive: true },
    include: { mealSlots: { include: { recipe: { include: { ingredients: true } } } } }
  });

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Plan săptămânal</h1>
      <WeeklyGrid slots={(mealPlan?.mealSlots as any) ?? []} />
    </section>
  );
}
