import { auth } from '@/lib/auth';
import { db } from '@/lib/db/db';
import { tasks, users } from '@/lib/db/schema';
import { and, asc, desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);

    const projectId = params.projectId;
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');
    const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';
    const sortField =
      searchParams.get('sort') === 'updatedAt'
        ? tasks.updatedAt
        : tasks.createdAt;

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
      .select({
        taskId: tasks.id,
        title: tasks.title,
        description: tasks.description,
        status: tasks.status,
        projectId: tasks.projectId,
        assignedTo: tasks.assignedTo,
        createdBy: tasks.createdBy,
        dueDate: tasks.dueDate,
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role, // Adjust based on your users schema
        },
      })
      .from(tasks)
      .leftJoin(users, eq(tasks.assignedTo, users.id)) // Join tasks with users
      .where(and(...whereConditions))
      .orderBy(order === 'desc' ? desc(sortField) : asc(sortField));

    return NextResponse.json({ tasks: result });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
