import agent from '@/lib/agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import TaskContainer from './TaskContainer';
import Task from './Task';
import { Circle } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface Props {
  projectId: string;
}

const NotStartedTask = ({ projectId }: Props) => {
  const [filter, setFilter] = useState({
    status: 'NOT_STARTED',
    order: 'desc',
    sort: 'updatedAt',
  });
  const queryClient = useQueryClient();
  const { data: notStartedTaskData, isError } = useQuery({
    queryKey: ['NOT_STARTED_TASK', projectId],
    queryFn: async () => {
      const res = await agent.Task.getTasks(projectId, filter);
      return res;
    },
  });

  // Mutation to update task status
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
      console.log(newStatus);

      queryClient.invalidateQueries({
        queryKey: ['NOT_STARTED_TASK', projectId],
      });
      if (newStatus === 'ON_PROGRESS') {
        queryClient.invalidateQueries({
          queryKey: ['ON_PROGRESS_TASK', projectId],
        });
      } else if (newStatus === 'DONE') {
        queryClient.invalidateQueries({ queryKey: ['DONE_TASK', projectId] });
      } else if (newStatus === 'REJECT') {
        queryClient.invalidateQueries({
          queryKey: ['REJECT_TASK', projectId],
        });
      }
    },
  });

  return (
    <TaskContainer
      status={
        <div className="flex gap-2 mt-2 justify-center items-center">
          {isPending ? (
            <Spinner className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
          <h2 className="text-sm font-bold">Not Started Task</h2>
        </div>
      }
    >
      <AnimatePresence initial={false}>
        {notStartedTaskData?.tasks.map((task, index) => (
          <Task
            icon={<Circle className="size-4" />}
            key={index}
            taskData={task}
            mutate={mutate}
          />
        ))}
      </AnimatePresence>
    </TaskContainer>
  );
};
//
export default NotStartedTask;
