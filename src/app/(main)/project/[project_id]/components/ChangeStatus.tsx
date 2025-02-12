import Button from '@/components/ui/button';
import { Status } from '@/interface/dto';
import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';

interface Props {
  currentStatus: Status;
  taskId: string;
  mutate: (data: { id: string; newStatus: string }) => void;
  setIsopen: Dispatch<SetStateAction<boolean>>;
}

const ChangeStatus = ({ currentStatus, mutate, taskId, setIsopen }: Props) => {
  const statuses: Status[] = ['NOT_STARTED', 'ON_PROGRESS', 'DONE', 'REJECT'];

  const availableStatuses = statuses.filter(
    (status) => status !== currentStatus
  );

  return (
    <div className="space-y-2 flex flex-col z-50">
      <p className="text-sm text-center">Status Change</p>
      {availableStatuses.map((status) => (
        <Button
          key={status}
          variant="outline"
          className={clsx('text-xs lg:text-xs px-2 lg:px-2 py-1 lg:py-1')}
          onClick={() => {
            mutate({ id: taskId, newStatus: status });
            setIsopen(false);
          }}
        >
          {status.replace('_', ' ')}{' '}
        </Button>
      ))}
    </div>
  );
};

export default ChangeStatus;
