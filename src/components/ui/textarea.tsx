// components/TextArea.tsx
import React from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
        <textarea
          id={label}
          ref={ref}
          className={`
            w-full px-2 py-1 text-sm lg:text-base lg:px-3 lg:py-2
            border border-primary/20 rounded-lg bg-background text-primary
            focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all duration-200
            resize-none
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
