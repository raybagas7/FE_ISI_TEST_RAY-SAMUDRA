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
    <div className="bg-black/20 flex-1">
      <NotStartedTask projectId={project_id as string} />
      <OnProgressTask />
      <DoneTask />
      <RejectTask />a
    </div>
  );
};

export default TaskList;
