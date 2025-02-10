import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import { getSession } from '@/lib/session';

// Get all users with the "TEAM" role
export async function GET(req: NextRequest) {
  const { error } = await getSession(req);
  if (error) return error;

  // Fetch users with the "TEAM" role
  const teamUsers = await db.query.users.findMany({
    where: eq(users.role, 'TEAM'),
    columns: {
      id: true,
      name: true,
      email: true,
    },
  });

  return NextResponse.json(teamUsers);
}
