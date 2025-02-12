import clsx from 'clsx';
import React from 'react';
import { LoaderPinwheel } from 'lucide-react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(['flex justify-center items-center', className])}
        {...rest}
      >
        <LoaderPinwheel className="size-8 animate-spin" />
      </div>
    );
  }
);

export default Spinner;
