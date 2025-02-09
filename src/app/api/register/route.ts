import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password, name, role } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
        role: role,
      })
      .returning();

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
}
