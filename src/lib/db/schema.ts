import { timestamp, pgTable, text, pgEnum, uuid } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['LEAD', 'TEAM']);
export const taskStatus = pgEnum('task_status', [
  'NOT_STARTED',
  'ON_PROGRESS',
  'DONE',
  'REJECT',
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRole('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  createdBy: uuid('created_by').references(() => users.id),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatus('status').default('NOT_STARTED'),
  projectId: uuid('project_id').references(() => projects.id),
  createdBy: uuid('created_by').references(() => users.id),
  assignedTo: uuid('assigned_to').references(() => users.id),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const taskHistory = pgTable('task_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id').references(() => tasks.id),
  userId: uuid('user_id').references(() => users.id),
  oldStatus: taskStatus('old_status'),
  newStatus: taskStatus('new_status'),
  changeType: text('change_type').notNull(),
  changedAt: timestamp('changed_at').defaultNow(),
  notes: text('notes'),
});

export const projectMembers = pgTable('project_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .references(() => projects.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
