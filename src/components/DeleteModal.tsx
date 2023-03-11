import { TodosData } from '@/utils/types';
import { useMutation, useQueryClient } from 'react-query';
import PopOutModal from './PopOutModal';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoToUpdate: TodosData | null;
  onDeleteTodoError: (err: string) => void;
}

const DeleteModal = ({
  isOpen,
  onClose,
  todoToUpdate,
  onDeleteTodoError
}: DeleteModalProps) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation(
    'deleteTodo',
    async (id: string) => {
      try {
        const res = await fetch(`./api/todos/${id}`, {
          method: 'DELETE'
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
        onClose();
      },
      onError: (err: { message: string }) => onDeleteTodoError(err.message)
    }
  );

  return (
    <div>
      <PopOutModal
        modalTitle="Are you sure to delete this Todo ?"
        isOpen={isOpen}
        onClose={onClose}
        modalType="Delete"
      >
        <div className="flex justify-end space-x-4 px-5 pb-4">
          <button
            className="rounded-md bg-titleLight px-3 py-1 text-white hover:bg-titleLightHover"
            onClick={() => {
              if (!todoToUpdate) {
                onDeleteTodoError('Somthing went wrong');
              } else {
                deleteTodoMutation.mutate(todoToUpdate.id);
              }
              onClose();
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="rounded-md bg-backGroundPrimary px-3 py-1 text-white hover:bg-titleDark"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </PopOutModal>
    </div>
  );
};

export default DeleteModal;
