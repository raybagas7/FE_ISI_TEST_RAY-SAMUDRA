import { auth } from '@/lib/auth';
import { db } from '@/lib/db/db';
import { tasks } from '@/lib/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Get all tasks from chosen project id
export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const projectId = params.projectId;
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const assignedTo = url.searchParams.get('assignedTo');
    const order = url.searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    const whereConditions = [eq(tasks.projectId, projectId)];
    if (status)
      whereConditions.push(
        eq(
          tasks.status,
          status as 'NOT_STARTED' | 'ON_PROGRESS' | 'DONE' | 'REJECT'
        )
      );
    if (assignedTo) whereConditions.push(eq(tasks.assignedTo, assignedTo));

    const result = await db
      .select()
      .from(tasks)
      .where(and(...whereConditions))
      .orderBy(order === 'desc' ? desc(tasks.createdAt) : asc(tasks.createdAt));

    return Response.json({ tasks: result });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
