import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { taskHistory } from '@/lib/db/schema';
import { getSession } from '@/lib/session';

// Get task history by task ID (LEAD & TEAM allowed)
export async function GET(req: NextRequest) {
  const { session, error } = await getSession(req);
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get('taskId');
  if (!taskId) {
    return NextResponse.json({ error: 'Task ID required' }, { status: 400 });
  }

  // Fetch task history
  const history = await db.query.taskHistory.findMany({
    where: eq(taskHistory.taskId, taskId),
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: (taskHistory, { desc }) => desc(taskHistory.changedAt),
  });

  return NextResponse.json(history);
}
