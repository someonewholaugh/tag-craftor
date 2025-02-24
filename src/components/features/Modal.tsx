import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Icon } from '@/components';
import type { ModalProps } from '@/types';

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-400/40 dark:bg-zinc-800/40 backdrop-blur-xl duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 flex items-end justify-center md:items-center">
        <DialogPanel
          transition
          className="w-full max-w-lg bg-white dark:bg-black overflow-y-auto rounded-t-lg md:rounded-lg p-4 duration-500 ease-out absolute bottom-0 md:relative md:bottom-auto data-[closed]:translate-y-full md:data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button
              title="Close"
              className="p-1 transition-colors duration-300 ease-in-out border rounded-full cursor-pointer bg-zinc-100 dark:bg-zinc-900 hover:dark:bg-zinc-800 hover:bg-zinc-200 border-zinc-500/40"
              onClick={onClose}
            >
              <Icon title="Close" name="X" size={16} />
            </Button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
