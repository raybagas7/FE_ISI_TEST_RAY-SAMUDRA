'use client';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Input from '@/components/ui/input';
import TextArea from '@/components/ui/textarea';
import Card from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/Toaster';

export default function CreateProject() {
  const formRef = useRef<{ title?: string; description?: string }>({});
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();
  const { mutate, isError, error, isPending } = useMutation({
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
    onSuccess: (data) => {
      formRef.current = {};
      router.push(`/project/${data[0].id}`);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      showToast({
        title: 'Project Created Successfully',
        description: `Redirecting...`,
        type: 'success',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card title="Create Project">
        {isError && (
          <p className="text-red-500 text-sm">{(error as Error).message}</p>
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
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </Card>
    </div>
  );
}
