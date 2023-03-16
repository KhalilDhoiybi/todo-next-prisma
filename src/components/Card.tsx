import { TodosData } from '@/utils/types';
import {
  DocumentCheckIcon,
  DocumentMinusIcon
} from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from 'react-query';
import CardDropDown from './CardDropDown';

export interface CardProps {
  todo: TodosData;
  onOpenDeleteTodoModal: () => void;
  onOpeneEditTodoModal: () => void;
  onUpdateTodo: (todo: TodosData) => void;
  onDoneTodoError: (err: string) => void;
}

const Card = ({
  todo,
  onOpenDeleteTodoModal,
  onOpeneEditTodoModal,
  onUpdateTodo,
  onDoneTodoError
}: CardProps) => {
  const queryClient = useQueryClient();

  const doneTodoMutation = useMutation(
    'doneTodo',
    async ({ id, done }: { id: string; done: boolean }) => {
      try {
        const res = await fetch(`./api/todos/done/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ done })
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
      },
      onError: (err: { message: string }) => onDoneTodoError(err.message)
    }
  );

  return (
    <div className="m-3 max-w-sm rounded-md border border-white">
      <div
        className={`flex items-center justify-between space-x-2 p-4 ${
          todo.description !== '' && 'border-b'
        }`}
      >
        <h2
          className={`prose text-2xl text-titleLight ${
            todo.done && 'line-through decoration-2'
          }`}
        >
          {todo.title}
        </h2>
        <div className="flex items-center justify-center space-x-2 p-2">
          <div
            onClick={() => {
              doneTodoMutation.mutate({ id: todo.id, done: !todo.done });
            }}
          >
            {todo.done ? (
              <DocumentMinusIcon className="h-6 w-6 text-red-600 hover:cursor-pointer hover:opacity-70" />
            ) : (
              <DocumentCheckIcon className="h-6 w-6 text-green-600 hover:cursor-pointer hover:opacity-70" />
            )}
          </div>
          <CardDropDown
            todo={todo}
            onOpenDeleteTodoModal={onOpenDeleteTodoModal}
            onOpeneEditTodoModal={onOpeneEditTodoModal}
            onUpdateTodo={onUpdateTodo}
            onDoneTodoError={onDoneTodoError}
          />
        </div>
      </div>

      {todo.description != '' && (
        <div className="p-4">
          <p
            className={`prose font-serif text-xl text-white ${
              todo.done && 'line-through decoration-2'
            }`}
          >
            {todo.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
