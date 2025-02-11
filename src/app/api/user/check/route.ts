import { NextRequest, NextResponse } from 'next/server';
import { isLeader } from '../../project/route';
import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

export const GET = async (req: NextRequest) => {
  try {
    const sessionOrResponse = await isLeader();
    if (sessionOrResponse instanceof NextResponse) {
      return sessionOrResponse;
    }

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the user by email
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(and(eq(users.email, email), eq(users.role, 'TEAM')))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: 'User not found or is not a TEAM member' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: user[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
