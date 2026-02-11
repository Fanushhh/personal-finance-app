# Meal Planner (Next.js 14+)

Aplicație pentru planificare meal prep săptămânală.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (Supabase)
- NextAuth.js (Credentials + Google)
- shadcn/ui-like components în `components/ui`
- Zustand
- TanStack Query
- Framer Motion

## Setup
1. `cd meal-planner`
2. `npm install`
3. Configurează `.env.local`
4. `npx prisma generate`
5. `npx prisma db push`
6. `npx prisma db seed`
7. `npm run dev`

## Structură principală
- `app/(dashboard)/plan/page.tsx` – grid 7x3
- `app/api/meal-plans/generate/route.ts` – generează plan nou
- `app/api/meal-plans/[id]/swap/route.ts` – swap rețetă
- `app/api/shopping-list/route.ts` – listă cumpărături agregată
- `prisma/seed.ts` – 100 rețete (30 breakfast, 40 lunch, 30 dinner)

## Funcționalități
- Login/register + Google OAuth
- Weekly plan cu swap pe slot
- Recipe CRUD API
- Shopping list auto-generată
- UI responsive + animații
