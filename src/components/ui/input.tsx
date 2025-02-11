// components/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label
            htmlFor={label}
            className="text-sm font-medium text-primary capitalize"
          >
            {label}
          </label>
        )}
        <input
          id={label}
          ref={ref}
          className={`
            px-2 py-1 text-sm lg:text-base w-full lg:px-3 lg:py-2 border border-primary/20 rounded-lg bg-background text-primary
            focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
