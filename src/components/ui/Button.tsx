import clsx from 'clsx';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isloading?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
}

// const Card = React.forwardRef<HTMLDivElement, Props>(

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = 'primary', ...rest }, ref) => {
    const variantClasses = {
      primary: 'bg-primary text-white',
      secondary: '',
      destructive: '',
      outline: '',
    };

    return (
      <button
        className={clsx(['', variantClasses[`${variant}`], className])}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
