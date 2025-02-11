import agent from '@/lib/agent';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

interface Props {
  projectId: string;
}

const NotStartedTask = ({ projectId }: Props) => {
  const [filter, setFilter] = useState({
    status: 'NOT_STARTED',
    order: 'desc',
    limit: 3,
  });

  const { data: notStartedTaskData } = useQuery({
    queryKey: ['NOT_STARTED_TASK', filter],
    queryFn: async () => {
      const res = await agent.Task.getTasks(projectId, filter);

      return res;
    },
  });
  console.log(notStartedTaskData);

  return <div>NotStartedTask</div>;
};
//
export default NotStartedTask;
