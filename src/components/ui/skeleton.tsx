import clsx from 'clsx';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx([
          'w-full min-h-5 bg-primary/10 animate-pulse',
          className,
        ])}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Skeleton;
