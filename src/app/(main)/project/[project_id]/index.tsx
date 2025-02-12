'use client';
import { RootState } from '@/lib/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import AssignMember from './components/AssignMember';
import ViewMember from './components/ViewMember';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import agent from '@/lib/agent';
import Skeleton from '@/components/ui/skeleton';

const DetailContent = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const { project_id } = useParams();
  const { data: projectMember, isPending } = useQuery({
    queryKey: ['PROJECT_MEMBER', project_id],
    queryFn: async () =>
      await agent.User.getUserByProjectId({ projectId: project_id }),
  });

  return (
    <div>
      {isPending ? (
        <div className="flex justify-between">
          <Skeleton className="h-10 w-32 rounded-md" />
          <div className="flex gap-4 justify-end">
            <Skeleton className="h-10 w-40 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </div>
      ) : (
        <>
          {projectMember && (
            <>
              <div className="flex justify-between">
                <ViewMember projectMember={projectMember} />
                {user?.role === 'LEAD' ? (
                  <div className="flex gap-4 justify-end">
                    <AssignMember />
                    <CreateTask projectMember={projectMember} />
                  </div>
                ) : null}
              </div>
              <TaskList />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DetailContent;
