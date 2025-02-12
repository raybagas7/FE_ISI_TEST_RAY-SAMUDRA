'use client';

import { useToast } from '@/hooks/Toaster';
import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';
import { X } from 'lucide-react';

const Toaster = () => {
  const { toasts, removeToast } = useToast();

  const ToastVariantClass: Record<string, string> = {
    success: 'border-done bg-done text-white',
    error: 'border-destructive bg-destructive text-white',
    info: 'border-blue-500 bg-blue-500 text-white',
    default: 'border-border',
  };

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          className={clsx([
            `fixed bottom-4 right-4 w-[300px] rounded-lg shadow-lg p-4 border`,
            ,
            ToastVariantClass[toast.type || 'default'],
          ])}
          duration={3000}
          onOpenChange={(open) => {
            if (!open) removeToast(toast.id);
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <Toast.Title className="font-bold">{toast.title}</Toast.Title>
              {toast.description && (
                <Toast.Description className="text-sm mt-1">
                  {toast.description}
                </Toast.Description>
              )}
            </div>
            <Toast.Close className="ml-2 text-primary hover:text-primary/80">
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
