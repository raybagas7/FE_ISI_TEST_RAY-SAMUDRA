'use client';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import Card from '@/components/ui/card';

export default function CreateProject() {
  const formRef = useRef<{ title?: string; description?: string }>({});

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formRef.current.title,
          description: formRef.current.description,
        }),
      });

      if (!res.ok) {
        throw new Error(
          'Failed to create project. Ensure you have the right access.'
        );
      }

      return res.json();
    },
    onSuccess: () => {
      formRef.current = {};
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card title="Create Project">
        {mutation.isError && (
          <p className="text-red-500 text-sm">
            {(mutation.error as Error).message}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-500 text-sm">
            Project created successfully!
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              label="title"
              onChange={(e) => (formRef.current.title = e.target.value)}
            />
          </div>

          <div>
            <TextArea
              label="description"
              onChange={(e) => (formRef.current.description = e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md bg-primary text-background font-semibold hover:bg-opacity-80 transition"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </Card>
    </div>
  );
}
