import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';

interface PopOutModalProps {
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopOutModal = ({
  modalTitle,
  children,
  isOpen,
  onClose
}: PopOutModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-50"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="flex items-center justify-center rounded-lg bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel>
                  <Dialog.Title>
                    <div className="flex items-center justify-between px-5 py-4">
                      <h2 className="p-1 text-xl text-slate-800">
                        {modalTitle}
                      </h2>
                      <div
                        className="flex rounded-sm p-1 hover:cursor-pointer hover:bg-slate-200"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-7 w-7 text-slate-700" />
                      </div>
                    </div>
                  </Dialog.Title>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PopOutModal;
