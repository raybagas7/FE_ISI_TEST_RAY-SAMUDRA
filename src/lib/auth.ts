import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { Adapter } from 'next-auth/adapters';
import { db } from './db/db';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 1. Check if credentials exist
        if (!credentials?.email || !credentials?.password) return null;

        // 2. Find user in database
        const user = await db.query.users.findFirst({
          where: (users, { eq }) =>
            eq(users.email, credentials.email as string),
        });

        // 3. Verify password
        if (
          user &&
          bcrypt.compareSync(credentials.password as string, user.password)
        ) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as 'LEAD' | 'TEAM';
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
