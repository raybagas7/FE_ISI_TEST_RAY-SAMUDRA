import agent from '@/lib/agent';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import TaskContainer from './TaskContainer';
import Task from './Task';
import { CircleDot } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface Props {
  projectId: string;
}

const OnProgressTask = ({ projectId }: Props) => {
  const [filter, setFilter] = useState({
    status: 'ON_PROGRESS',
    order: 'desc',
    sort: 'updatedAt',
  });
  const queryClient = useQueryClient();
  const { data: onProgressTaskData, isError } = useQuery({
    queryKey: ['ON_PROGRESS_TASK', projectId],
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
      console.log(newStatus);

      queryClient.invalidateQueries({
        queryKey: ['ON_PROGRESS_TASK', projectId],
      });
      if (newStatus === 'NOT_STARTED') {
        queryClient.invalidateQueries({
          queryKey: ['NOT_STARTED_TASK', projectId],
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
            <Spinner className="size-5 text-onproggress" />
          ) : (
            <CircleDot className="size-5 text-onproggress" />
          )}
          <h2 className="text-sm font-bold">On Progress</h2>
        </div>
      }
    >
      <AnimatePresence initial={false}>
        {onProgressTaskData?.tasks.map((task, index) => (
          <Task
            icon={<CircleDot className="size-5 text-onproggress" />}
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
export default OnProgressTask;
