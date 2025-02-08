import NextAuth, { NextAuthConfig } from 'next-auth';
import Credential from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { Adapter } from 'next-auth/adapters';
import { db } from './db/schema';

export const authOptions: NextAuthConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [Credential],
  session: {
    strategy: 'jwt',
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
