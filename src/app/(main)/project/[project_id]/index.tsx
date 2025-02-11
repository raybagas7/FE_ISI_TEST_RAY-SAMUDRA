'use client';
import { RootState } from '@/lib/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';

const DetailContent = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      {user?.role === 'LEAD' ? <CreateTask /> : null}
      <TaskList />
    </div>
  );
};

export default DetailContent;
