import { db } from '@/lib/db/db';
import { projectMembers, users } from '@/lib/db/schema';
import { isLeader } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Get all assign User in the project
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json(
      { error: 'Project ID is required' },
      { status: 400 }
    );
  }

  const members = await db
    .select({
      userId: projectMembers.userId,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(projectMembers)
    .leftJoin(users, eq(projectMembers.userId, users.id))
    .where(eq(projectMembers.projectId, projectId));

  return NextResponse.json(members);
}

// Assign user to the project
export async function POST(req: NextRequest) {
  const sessionOrResponse = await isLeader();
  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse;
  }

  const { projectId, userId } = await req.json();

  // Check if the user is a TEAM member
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });

  if (!user || user.role !== 'TEAM') {
    return NextResponse.json(
      { error: 'Only TEAM members can be assigned' },
      { status: 400 }
    );
  }

  // Check if the user is already assigned
  const existingAssignment = await db.query.projectMembers.findFirst({
    where: (projectMembers, { and, eq }) =>
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId)
      ),
  });

  if (existingAssignment) {
    return NextResponse.json(
      { error: 'User already assigned' },
      { status: 400 }
    );
  }

  // Assign the user to the project
  const newAssignment = await db
    .insert(projectMembers)
    .values({
      id: crypto.randomUUID(),
      projectId,
      userId,
    })
    .returning();

  return NextResponse.json(newAssignment[0]);
}
