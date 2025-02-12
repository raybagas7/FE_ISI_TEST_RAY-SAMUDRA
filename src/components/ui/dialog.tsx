import React, { useEffect, useRef } from 'react';
interface Props extends React.DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, onClose, children, ...rest }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    isOpen ? dialog?.showModal() : dialog?.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="p-6 rounded-lg shadow-lg backdrop:bg-black/50 bg-white w-full max-w-md"
      {...rest}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-xl">
        ✖
      </button>
      {children}
    </dialog>
  );
};

export default Dialog;
