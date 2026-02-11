import Link from 'next/link';

import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold">Meal Prep Planner</h1>
      <p className="text-gray-600">Planifică mesele săptămânale, schimbă rețete rapid și generează lista de cumpărături automat.</p>
      <div className="flex gap-3">
        <Link href="/register"><Button>Creează cont</Button></Link>
        <Link href="/login"><Button className="bg-secondary">Login</Button></Link>
      </div>
    </main>
  );
}
