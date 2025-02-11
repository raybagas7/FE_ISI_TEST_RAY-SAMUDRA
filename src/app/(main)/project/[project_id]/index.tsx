'use client';
import { RootState } from '@/lib/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import AssignMember from './components/AssignMember';

const DetailContent = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      {user?.role === 'LEAD' ? (
        <div className="flex gap-4 justify-end">
          <AssignMember />
          <CreateTask />
        </div>
      ) : null}
      <TaskList />
    </div>
  );
};

export default DetailContent;
