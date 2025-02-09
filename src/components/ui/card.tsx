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
          'w-full max-w-lg bg-white text-secondary p-8 rounded-2xl shadow-lg border border-gray-300',
          className,
        ])}
        ref={ref}
        {...rest}
      >
        <h2 className="text-2xl font-bold text-center text-secondary mb-4">
          {title}
        </h2>
        {children}
      </div>
    );
  }
);

export default Card;
