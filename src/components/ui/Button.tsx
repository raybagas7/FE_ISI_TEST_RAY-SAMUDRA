import clsx from 'clsx';
import React from 'react';
import { LoaderPinwheel } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isloading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = 'primary', isloading, ...rest }, ref) => {
    const variantClasses = {
      primary: 'bg-primary text-white',
      secondary: 'bg-background text-primary',
      destructive: 'bg-destructive text-white',
      outline:
        'bg-transparent border border-primary text-primary hover:opacity-100 hover:bg-primary hover:text-white transition-opacity transition-colors',
    };

    return (
      <button
        className={clsx([
          'text-sm lg:text-base',
          'py-2 rounded-lg hover:opacity-80 transition-opacity flex justify-center items-center',
          variantClasses[`${variant}`],
          isloading ? 'px-2' : 'px-4',
          className,
        ])}
        ref={ref}
        {...rest}
      >
        {isloading ? (
          <LoaderPinwheel className="size-5 animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
