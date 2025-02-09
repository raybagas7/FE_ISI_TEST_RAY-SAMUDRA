import { NextRequest, NextResponse } from 'next/server';
import { and, asc, desc, eq, ilike, isNull, sql } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { auth } from '@/lib/auth';
import { projects } from '@/lib/db/schema';

// Middleware to check if the user is a LEAD
export async function isLeader(req: NextRequest) {
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

// Get project details with tasks
export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userRole = session.user.role; // Assuming role is stored in session
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    // Sorting
    const sortField =
      searchParams.get('sort') === 'updatedAt'
        ? projects.updatedAt
        : projects.createdAt;
    const sortOrder =
      searchParams.get('order') === 'asc' ? asc(sortField) : desc(sortField);

    // Search by title (case-insensitive)
    const search = searchParams.get('search');

    // Query conditions
    const conditions = [];
    if (search) conditions.push(ilike(projects.title, `%${search}%`));

    // Soft delete handling
    if (userRole !== 'LEAD') {
      conditions.push(isNull(projects.deletedAt)); // TEAM can't see deleted projects
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Fetch projects
    const projectList = await db
      .select()
      .from(projects)
      .where(whereClause)
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(whereClause);

    return NextResponse.json({
      projects: projectList,
      pagination: {
        total: totalCount[0].count,
        page,
        limit,
        hasMore: offset + limit < totalCount[0].count,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
