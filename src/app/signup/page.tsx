'use client';

import { useRef, useState } from 'react';
import Input from '@/components/ui/input';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import RoleSwitch from '@/components/ui/roleswitch';
import Card from '@/components/ui/card';
import Link from 'next/link';

const SignUp = () => {
  const registerRef = useRef<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [role, setRole] = useState<'LEAD' | 'TEAM'>('LEAD');

  const navigate = useRouter();

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...registerRef.current, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      return res.json();
    },
    onSuccess: () => {
      registerRef.current = {};
      navigate.push('/');
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card title="Sign Up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerMutation.mutate();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <p className="text-sm font-medium text-primary capitalize mb-2">
              Role
            </p>
            <RoleSwitch role={role} setRole={setRole} />
          </div>
          <Input
            type="text"
            label="name"
            placeholder="Ray Sam"
            onChange={(e) => (registerRef.current.name = e.target.value)}
          />
          <Input
            type="email"
            label="email"
            placeholder="ray@example.com"
            onChange={(e) => (registerRef.current.email = e.target.value)}
          />
          <Input
            type="password"
            label="password"
            placeholder="••••••••"
            onChange={(e) => (registerRef.current.password = e.target.value)}
          />

          {registerMutation.isError && (
            <p className="text-red-500 text-sm">
              {(registerMutation.error as Error).message}
            </p>
          )}
          {registerMutation.isSuccess && (
            <p className="text-green-500 text-sm">
              Account created successfully! 🎉
            </p>
          )}

          <button
            type="submit"
            className="p-2 bg-primary text-background rounded-md hover:opacity-80 transition"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 flex justify-end">
          <Link href={'/'}>Login with existing account</Link>
        </div>
      </Card>
    </main>
  );
};

export default SignUp;
