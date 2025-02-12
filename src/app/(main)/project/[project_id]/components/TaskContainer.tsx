import clsx from 'clsx';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  status: React.ReactNode;
}

const TaskContainer = React.forwardRef<HTMLElement, Props>(
  ({ className, children, status, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        id="task-container"
        className={clsx([
          'h-full w-full max-h-none lg:h-[75vh] bg-background rounded-md border border-border overflow-x-auto lg:overflow-y-scroll',
          className,
        ])}
        {...rest}
      >
        {status}
        <div className="grid grid-flow-col gap-2 p-2 lg:block grow-0">
          {children}
        </div>
      </section>
    );
  }
);

export default TaskContainer;
