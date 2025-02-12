import { TaskDetail } from '@/interface/dto';
import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';
import { Circle, CircleUserRound, Ellipsis } from 'lucide-react';
import PopOver from '@/components/ui/popover';
import ChangeStatus from './ChangeStatus';
import Spinner from '@/components/ui/spinner';

type Props = {
  taskData: TaskDetail;
  mutate: (data: { id: string; newStatus: string }) => void;
  icon: React.ReactNode;
} & HTMLMotionProps<'div'>;

const Task = React.forwardRef<HTMLDivElement, Props>(
  ({ className, taskData, mutate, icon, ...rest }, ref) => {
    const [openOption, setOpenOption] = React.useState(false);
    // const handleStatusChange = (newStatus: string) => {
    //   mutate({ id: taskData.id, newStatus });
    // };

    return (
      <motion.div
        key={taskData.taskId}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        ref={ref}
        className={className}
        {...rest}
      >
        <div className={clsx(['py-1'])}>
          <motion.div
            className={clsx([
              'flex lg:items-center lg:justify-between',
              'p-3 rounded-md',
              'bg-white border border-border',
              'w-56 h-32 items-start justify-start ',
              'lg:w-full lg:h-36',
            ])}
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
              filter: 'blur(4px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
              filter: 'blur(4px)',
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className="flex flex-col w-full h-full justify-between">
              <div className=" space-y-2">
                <div className="flex justify-between">
                  <div className="flex gap-1 items-center">
                    {icon}
                    <p className="text-neutral-950 text-sm line-clamp-2">
                      {taskData.title}
                    </p>
                  </div>
                  <div className="size-4">
                    <PopOver
                      isOpen={openOption}
                      setIsopen={setOpenOption}
                      portal
                      align="end"
                      side="bottom"
                      contentClassName="p-2"
                      closeButton={false}
                      trigger={<Ellipsis className="size-4 cursor-pointer" />}
                      content={
                        <ChangeStatus
                          setIsopen={setOpenOption}
                          mutate={mutate}
                          currentStatus={taskData.status}
                          taskId={taskData.taskId}
                        />
                      }
                    />
                  </div>
                </div>
                <p className="text-neutral-950 text-sm">
                  {taskData.description}
                </p>
              </div>

              <div className="w-full flex justify-between gap-2">
                <div className="text-xs line-clamp-2">
                  <p className="">
                    <span>{taskData.user.name}</span>/
                    <span>{taskData.user.email}</span>
                  </p>
                </div>
                <div className="size-4">
                  <CircleUserRound className="size-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

export default Task;
