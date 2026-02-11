import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const body = await request.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password
    }
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
