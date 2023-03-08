import { TodoInput } from '@/utils/types';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';

interface AddNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodoSuccess: (data: TodoInput) => void;
}

const AddNewModal = ({
  isOpen,
  onClose,
  onAddTodoSuccess
}: AddNewModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TodoInput>();

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
                        Add New Todo
                      </h2>
                      <div
                        className="flex rounded-sm p-1 hover:cursor-pointer hover:bg-slate-200"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-7 w-7 text-slate-700" />
                      </div>
                    </div>
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit((data) => {
                      // TODO: The line below should be moved to react query mutation and call AddNew mutation here
                      onAddTodoSuccess(data);
                      reset({
                        title: '',
                        description: ''
                      });
                    })}
                  >
                    <div className="flex flex-col px-6">
                      <input
                        className="rounded-md border border-titleLight py-2 px-3 font-sans text-lg text-titleLight outline-2 outline-offset-0 outline-titleLight focus:border-white focus:outline"
                        type="text"
                        id="todoTitle"
                        placeholder="Title"
                        {...register('title', { required: true })}
                      />
                      <span className="flex h-8 items-center space-x-1 py-1 text-sm text-titleLight">
                        {errors.title && (
                          <>
                            <ExclamationCircleIcon className="h-4 w-4" />
                            <p>Todo title is required!</p>
                          </>
                        )}
                      </span>
                      <textarea
                        className="text-md resize-none rounded-md border border-backGroundPrimary py-2 px-3 font-serif text-titleDark outline-2 outline-offset-0 outline-titleDark focus:border-white focus:outline"
                        id="todoContent"
                        cols={30}
                        rows={10}
                        placeholder="Description"
                        {...register('description')}
                      />
                      <div className="py-1"></div>

                      <div className="flex justify-end space-x-2 py-4">
                        <button
                          type="submit"
                          className="rounded-md bg-titleLight px-3 py-1 text-white hover:bg-titleLightHover"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="rounded-md bg-backGroundPrimary px-3 py-1 text-white hover:bg-titleDark"
                          onClick={() => {
                            reset({
                              title: '',
                              description: ''
                            });
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddNewModal;
