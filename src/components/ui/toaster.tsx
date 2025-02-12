'use client';

import { useToast } from '@/hooks/Toaster';
import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';
import { X } from 'lucide-react';

const Toaster = () => {
  const { toasts, removeToast } = useToast();

  const ToastVariantClass: Record<string, string> = {
    success: 'border-primary',
    error: 'border-destructive',
    info: 'border-blue-500',
    default: 'border-border',
  };

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          className={clsx([
            `fixed bottom-4 right-4 w-[300px] rounded-lg shadow-lg p-4 bg-white border`,
            ,
            ToastVariantClass[toast.type || 'default'],
          ])}
          duration={5000}
          onOpenChange={(open) => {
            if (!open) removeToast(toast.id);
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Toast.Title className="font-bold text-gray-800">
                {toast.title}
              </Toast.Title>
              {toast.description && (
                <Toast.Description className="text-sm text-gray-600 mt-1">
                  {toast.description}
                </Toast.Description>
              )}
            </div>
            <Toast.Close className="ml-2 text-gray-500 hover:text-gray-800">
              <X className="h-4 w-4" />
            </Toast.Close>
          </div>
        </Toast.Root>
      ))}
      <Toast.Viewport />
    </Toast.Provider>
  );
};

export default Toaster;
