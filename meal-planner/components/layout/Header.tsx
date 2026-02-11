import Link from 'next/link';

import { GeneratePlanButton } from '@/components/meal-plan/GeneratePlanButton';

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/plan" className="text-lg font-bold text-primary">Meal Planner</Link>
        <GeneratePlanButton />
      </div>
    </header>
  );
}
