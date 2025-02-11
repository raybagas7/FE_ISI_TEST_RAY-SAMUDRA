import { NextRequest, NextResponse } from 'next/server';
import { and, asc, desc, eq, ilike, inArray, isNull, sql } from 'drizzle-orm';
import { db } from '@/lib/db/db';
import { auth } from '@/lib/auth';
import { projectMembers, projects } from '@/lib/db/schema';

// Get all project
export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userId = session.user.id;
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

    if (userRole === 'LEAD') {
      // LEAD users only see their own projects
      conditions.push(eq(projects.createdBy, userId));
    } else if (userRole === 'TEAM') {
      // TEAM users only see projects they are assigned to
      conditions.push(
        inArray(
          projects.id,
          db
            .select({ projectId: projectMembers.projectId })
            .from(projectMembers)
            .where(eq(projectMembers.userId, userId))
        )
      );
    }

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
