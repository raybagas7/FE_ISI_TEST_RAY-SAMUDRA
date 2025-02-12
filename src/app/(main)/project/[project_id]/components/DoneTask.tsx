import agent from '@/lib/agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import TaskContainer from './TaskContainer';
import Task from './Task';
import { CircleCheckBig } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface Props {
  projectId: string;
}

const DoneTask = ({ projectId }: Props) => {
  const [filter, setFilter] = useState({
    status: 'DONE',
    order: 'desc',
    sort: 'updatedAt',
  });
  const queryClient = useQueryClient();
  const { data: dontTaskData, isError } = useQuery({
    queryKey: ['DONE_TASK', projectId, filter.status, filter.order],
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
        queryKey: ['DONE_TASK', projectId],
      });
      if (newStatus === 'NOT_STARTED') {
        queryClient.invalidateQueries({
          queryKey: ['NOT_STARTED_TASK', projectId],
        });
      } else if (newStatus === 'ON_PROGRESS') {
        queryClient.invalidateQueries({
          queryKey: ['ON_PROGRESS_TASK', projectId],
        });
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
            <Spinner className="size-5 text-done" />
          ) : (
            <CircleCheckBig className="size-5 text-done" />
          )}
          <h2 className="text-sm font-bold">Done Task</h2>
        </div>
      }
    >
      <AnimatePresence initial={false}>
        {dontTaskData?.tasks.map((task, index) => (
          <Task
            key={index}
            taskData={task}
            mutate={mutate}
            icon={<CircleCheckBig className="size-5 text-done" />}
          />
        ))}
      </AnimatePresence>
    </TaskContainer>
  );
};
//
export default DoneTask;
