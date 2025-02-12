import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function getSession() {
  const session = await auth();
  if (!session) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { session };
}

export async function isLeader() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (session.user.role !== 'LEAD') {
    return NextResponse.json(
      { error: 'Forbidden: Only LEAD users can perform this action' },
      { status: 403 }
    );
  }

  return session;
}
