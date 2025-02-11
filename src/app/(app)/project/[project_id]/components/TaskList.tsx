import React from 'react';
import NotStartedTask from './NotStartedTask';
import OnProgressTask from './OnProgressTask';
import DoneTask from './DoneTask';
import RejectTask from './RejectTask';

const TaskList = () => {
  return (
    <div className="bg-black/20 h-full">
      <NotStartedTask />
      <OnProgressTask />
      <DoneTask />
      <RejectTask />a
    </div>
  );
};

export default TaskList;
