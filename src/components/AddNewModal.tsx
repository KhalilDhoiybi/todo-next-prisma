import { TodoInput } from '@/utils/types';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import PopOutModal from './PopOutModal';

interface AddNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodoError: (err: string) => void;
}

const AddNewModal = ({ isOpen, onClose, onAddTodoError }: AddNewModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TodoInput>();

  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    'addTodo',
    async ({ title, description }: TodoInput) => {
      try {
        const res = await fetch('./api/todos', {
          method: 'POST',
          body: JSON.stringify({ title, description })
        });
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return await res.json();
      } catch (error) {
        throw new Error('Something went wrong');
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getTodos');
        reset({
          title: '',
          description: ''
        });
        onClose();
      },
      onError: (err: { message: string }) => onAddTodoError(err.message)
    }
  );

  return (
    <PopOutModal
      modalTitle="Add New Todo"
      isOpen={isOpen}
      onClose={onClose}
      modalType="Add"
    >
      <form onSubmit={handleSubmit((data) => addTodoMutation.mutate(data))}>
        <div className="flex flex-col px-6">
          <input
            className="rounded-md border border-titleLight py-2 px-3 font-sans text-lg text-titleLight outline-2 outline-offset-0 outline-titleLight focus:border-white focus:outline"
            type="text"
            id="todoTitle"
            placeholder="Title."
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
            placeholder="Description can be empty."
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
    </PopOutModal>
  );
};

export default AddNewModal;
