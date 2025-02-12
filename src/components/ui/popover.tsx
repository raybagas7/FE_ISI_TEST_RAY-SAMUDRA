'use client';

import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  isOpen?: boolean;
  setIsopen?: Dispatch<SetStateAction<boolean>>;
  closeButton?: boolean;
  contentClassName?: string;
  portal?: boolean;
}

const PopOver = ({
  trigger,
  content,
  side = 'bottom',
  align = 'center',
  isOpen,
  setIsopen,
  closeButton = true,
  contentClassName,
  portal = false,
}: PopoverProps) => {
  return (
    <Popover.Root modal={true} open={isOpen} onOpenChange={setIsopen}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      {portal ? (
        <Popover.Portal>
          <Popover.Content
            className={clsx([
              'shadow-lg border bg-white rounded-md outline-none ring-0',
              contentClassName ? contentClassName : 'p-4',
            ])}
            side={side}
            align={align}
          >
            {content}
            {closeButton && (
              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <X className="size-4" />
              </Popover.Close>
            )}
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content
          className={clsx([
            'shadow-lg border bg-white rounded-md outline-none ring-0',
            contentClassName ? contentClassName : 'p-4',
          ])}
          side={side}
          align={align}
        >
          {content}
          {closeButton && (
            <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X className="size-4" />
            </Popover.Close>
          )}
        </Popover.Content>
      )}
    </Popover.Root>
  );
};

export default PopOver;
