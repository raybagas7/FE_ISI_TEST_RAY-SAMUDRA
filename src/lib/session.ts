import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function getSession(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { session };
}
