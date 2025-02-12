import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { taskHistory, tasks } from '@/lib/db/schema';
import { getSession } from '@/lib/session';

// Create a new task (LEAD only)
export async function POST(req: NextRequest) {
  const { session, error } = await getSession();
  if (error) return error;
  if (session.user.role !== 'LEAD') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { title, description, projectId, assignedTo, dueDate } =
    await req.json();

  const parsedDueDate = new Date(dueDate);
  if (isNaN(parsedDueDate.getTime())) {
    return NextResponse.json({ error: 'Invalid dueDate' }, { status: 400 });
  }

  const newTask = await db
    .insert(tasks)
    .values({
      id: crypto.randomUUID(),
      title,
      description,
      projectId,
      assignedTo,
      createdBy: session.user.id,
      dueDate: parsedDueDate,
    })
    .returning();

  return NextResponse.json(newTask[0]);
}

// Get task details (any authenticated user)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get('id');
  if (!taskId) {
    return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
  }

  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, taskId),
    with: {
      project: true,
      history: true,
    },
  });

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task);
}

// Update task details (LEAD only) or update task status (LEAD & TEAM)
export async function PUT(req: NextRequest) {
  const { session, error } = await getSession();
  if (error) return error;

  const { id, title, description, status, notes } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
  }

  // Fetch the task to check the previous status
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  });

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  // If the user is a TEAM member, they can only update the status
  if (session.user.role === 'TEAM') {
    if (!status || title || description) {
      return NextResponse.json(
        { error: 'TEAM members can only update status' },
        { status: 403 }
      );
    }
  }

  // Update the task
  const updatedTask = await db
    .update(tasks)
    .set({ title, description, status, updatedAt: new Date() })
    .where(eq(tasks.id, id))
    .returning();

  // If status changed, log it in task history
  if (status && status !== task.status) {
    await db.insert(taskHistory).values({
      id: crypto.randomUUID(),
      taskId: id,
      userId: session.user.id,
      oldStatus: task.status,
      newStatus: status,
      changeType: 'STATUS_UPDATE',
      notes,
      changedAt: new Date(),
    });
  }

  return NextResponse.json(updatedTask);
}

// Delete a task (LEAD only)
export async function DELETE(req: NextRequest) {
  const { session, error } = await getSession();
  if (error) return error;
  if (session.user.role !== 'LEAD') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
  }

  await db.delete(tasks).where(eq(tasks.id, id));

  return NextResponse.json({ message: 'Task deleted' });
}
