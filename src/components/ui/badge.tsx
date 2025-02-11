import clsx from 'clsx';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        className={clsx([
          'bg-primary text-white lg:text-sm text-xs py-1 px-2 w-fit rounded-md',
          'hover:opacity-80 transition-colors cursor-pointer',
          className,
        ])}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Badge;
