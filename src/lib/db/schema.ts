import { timestamp, pgTable, text, pgEnum } from 'drizzle-orm/pg-core';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

export const userRole = pgEnum('user_role', ['LEAD', 'TEAM']);
export const taskStatus = pgEnum('task_status', [
  'NOT_STARTED',
  'ON_PROGRESS',
  'DONE',
  'REJECT',
]);

const connectionString = process.env.AUTH_DRIZZLE_URL!;
const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(pool);
export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRole('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
