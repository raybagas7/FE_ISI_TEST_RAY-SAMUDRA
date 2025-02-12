'use client';
import React from 'react';
import NotStartedTask from './NotStartedTask';
import OnProgressTask from './OnProgressTask';
import DoneTask from './DoneTask';
import RejectTask from './RejectTask';
import { useParams } from 'next/navigation';

const TaskList = () => {
  const { project_id } = useParams();

  return (
    <div className="flex-1 grid grid-rows-4 grid-cols-none lg:grid-rows-none lg:grid-cols-4 gap-2 min-h-0">
      <NotStartedTask projectId={project_id as string} />
      <OnProgressTask projectId={project_id as string} />
      <DoneTask projectId={project_id as string} />
      <RejectTask projectId={project_id as string} />
    </div>
  );
};

export default TaskList;
