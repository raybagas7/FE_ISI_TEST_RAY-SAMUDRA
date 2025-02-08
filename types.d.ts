// types.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string;
    email: string;
    role: 'LEAD' | 'TEAM';
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email: string;
      role: 'LEAD' | 'TEAM';
    };
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    role: 'LEAD' | 'TEAM';
  }
}
