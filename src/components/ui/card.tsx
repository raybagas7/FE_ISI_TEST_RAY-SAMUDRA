import clsx from 'clsx';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, title, ...rest }, ref) => {
    return (
      <div
        className={clsx([
          'w-full max-w-lg bg-white text-primary p-8 rounded-2xl shadow-lg border border-border',
          className,
        ])}
        ref={ref}
        {...rest}
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          {title}
        </h2>
        {children}
      </div>
    );
  }
);

export default Card;
