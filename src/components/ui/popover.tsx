'use client';

import * as Popover from '@radix-ui/react-popover';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  isOpen?: boolean;
  setIsopen?: Dispatch<SetStateAction<boolean>>;
}

const PopOver = ({
  trigger,
  content,
  side = 'bottom',
  align = 'center',
  isOpen,
  setIsopen,
}: PopoverProps) => {
  return (
    <Popover.Root modal={true} open={isOpen} onOpenChange={setIsopen}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Content
        className="p-4 shadow-lg border bg-white rounded-md"
        side={side}
        align={align}
      >
        {content}
        <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </Popover.Close>
      </Popover.Content>
    </Popover.Root>
  );
};

export default PopOver;
