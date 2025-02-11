import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/db';
import { auth } from '@/lib/auth';
import { projectMembers, projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Middleware to check if the user is a LEAD
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

// Create a new project
export async function POST(req: NextRequest) {
  const sessionOrResponse = await isLeader();

  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse;
  }
  const session = sessionOrResponse;

  const { title, description } = await req.json();
  const projectId = crypto.randomUUID();

  // Insert the new project
  const newProject = await db
    .insert(projects)
    .values({
      id: projectId,
      title,
      description,
      createdBy: session.user.id,
    })
    .returning();

  // Automatically assign the leader to the project
  await db.insert(projectMembers).values({
    id: crypto.randomUUID(),
    projectId,
    userId: session.user.id,
  });

  return NextResponse.json(newProject);
}
// Get project details with tasks
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('id');
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID required' },
        { status: 400 }
      );
    }

    const project = await db.query.projects.findFirst({
      where: (project, { eq }) => eq(project.id, projectId),
      with: {
        tasks: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Update a project
export async function PUT(req: NextRequest) {
  const sessionOrResponse = await isLeader();
  if (sessionOrResponse instanceof NextResponse) {
    return sessionOrResponse;
  }

  const { id, title, description } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
  }

  const updatedProject = await db
    .update(projects)
    .set({ title, description, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();

  return NextResponse.json(updatedProject);
}

// Delete a project (soft delete by setting deletedAt)
export async function DELETE(req: NextRequest) {
  const session = await isLeader();
  if (!session) return;

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
  }

  await db
    .update(projects)
    .set({ deletedAt: new Date() })
    .where(eq(projects.id, id));

  return NextResponse.json({ message: 'Project deleted' });
}
