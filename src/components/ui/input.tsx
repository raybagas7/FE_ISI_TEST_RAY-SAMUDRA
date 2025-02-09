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
            className="text-sm font-medium text-secondary capitalize"
          >
            {label}
          </label>
        )}
        <input
          id={label}
          ref={ref}
          className={`
            w-full px-3 py-2 border border-secondary/20 rounded-lg bg-primary text-secondary
            focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all duration-200
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
