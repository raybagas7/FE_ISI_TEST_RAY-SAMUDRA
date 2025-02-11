import React from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import { auth } from '@/lib/auth';

const DetailProject = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div className="pt-[88px] pb-4 px-4 h-screen">
      <div className="h-full bg-black/10 flex flex-col">
        <CreateTask />
        <TaskList />
      </div>
    </div>
  );
};

export default DetailProject;
