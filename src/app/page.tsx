'use client';

import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Input from '@/components/ui/input';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/card';

const SignIn = () => {
  const loginRef = useRef<{ email?: string; password?: string }>({});
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const result = await signIn('credentials', {
        email: loginRef.current.email,
        password: loginRef.current.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      router.replace('/home');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card title="Sign In">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate();
          }}
          className="flex flex-col gap-4"
        >
          <Input
            label="email"
            placeholder="Email"
            onChange={(e) => (loginRef.current.email = e.target.value)}
          />
          <Input
            label="password"
            type="password"
            placeholder="Password"
            onChange={(e) => (loginRef.current.password = e.target.value)}
          />
          {loginMutation.isError && (
            <p className="text-sm text-red-500 text-center">
              Invalid Credential
            </p>
          )}
          <button
            type="submit"
            className="p-2 bg-primary text-background rounded-md hover:opacity-80 transition"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 flex justify-end">
          <Link href={'/signup'}>Create New Account</Link>
        </div>
      </Card>
    </main>
  );
};

export default SignIn;
