import agent from '@/lib/agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import TaskContainer from './TaskContainer';
import Task from './Task';
import { Ban } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface Props {
  projectId: string;
}

const RejectTask = ({ projectId }: Props) => {
  const [filter, setFilter] = useState({
    status: 'REJECT',
    order: 'desc',
    sort: 'updatedAt',
  });
  const queryClient = useQueryClient();
  const { data: onProgressTaskData, isError } = useQuery({
    queryKey: ['REJECT_TASK', projectId],
    queryFn: async () => {
      const res = await agent.Task.getTasks(projectId, filter);

      return res;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: string;
    }) => {
      return await agent.Task.putChangeTaskStatus({ id, status: newStatus });
    },
    onSuccess: (_: any, { newStatus }) => {
      queryClient.invalidateQueries({
        queryKey: ['REJECT_TASK', projectId],
      });
      if (newStatus === 'NOT_STARTED') {
        queryClient.invalidateQueries({
          queryKey: ['NOT_STARTED_TASK', projectId],
        });
      } else if (newStatus === 'ON_PROGRESS') {
        queryClient.invalidateQueries({
          queryKey: ['ON_PROGRESS_TASK', projectId],
        });
      } else if (newStatus === 'DONE') {
        queryClient.invalidateQueries({
          queryKey: ['DONE_TASK', projectId],
        });
      }
    },
  });

  return (
    <TaskContainer
      status={
        <div className="flex gap-2 mt-2 justify-center items-center">
          {isPending ? (
            <Spinner className="size-5 text-destructive" />
          ) : (
            <Ban className="size-5 text-destructive" />
          )}
          <h2 className="text-sm font-bold">Reject Task</h2>
        </div>
      }
    >
      <AnimatePresence initial={false}>
        {onProgressTaskData?.tasks.map((task, index) => (
          <Task
            key={index}
            taskData={task}
            mutate={mutate}
            icon={<Ban className="size-5 text-destructive" />}
          />
        ))}
      </AnimatePresence>
    </TaskContainer>
  );
};
//
export default RejectTask;
