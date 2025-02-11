import clsx from 'clsx';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const ThinCard = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx([
          'flex justify-between mt-4 items-center w-full p-2 border-border rounded-md border',
          className,
        ])}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default ThinCard;
