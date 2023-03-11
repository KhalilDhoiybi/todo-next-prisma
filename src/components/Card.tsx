import { TodosData } from '@/utils/types';
import {
  DocumentCheckIcon,
  DocumentMinusIcon
} from '@heroicons/react/24/solid';
import CardDropDown from './CardDropDown';

export interface CardProps {
  todo: TodosData;
  onOpenDeleteTodoModal: () => void;
}

const Card = ({ todo, onOpenDeleteTodoModal }: CardProps) => {
  const { title, description, done } = todo;
  return (
    <div className="m-3 max-w-sm rounded-md border border-white">
      <div
        className={`flex items-center justify-between space-x-2 p-4 ${
          description !== '' && 'border-b'
        }`}
      >
        <h2
          className={`prose text-2xl text-titleLight ${
            done && 'line-through decoration-2'
          }`}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center space-x-2 p-2">
          {done ? (
            <DocumentMinusIcon className="h-6 w-6 text-red-600 hover:cursor-pointer hover:opacity-70" />
          ) : (
            <DocumentCheckIcon className="h-6 w-6 text-green-600 hover:cursor-pointer hover:opacity-70" />
          )}
          <CardDropDown
            todo={todo}
            onOpenDeleteTodoModal={onOpenDeleteTodoModal}
          />
        </div>
      </div>

      {description != '' && (
        <div className="p-4">
          <p
            className={`prose font-serif text-xl text-white ${
              done && 'line-through decoration-2'
            }`}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
