import {
  DocumentCheckIcon,
  DocumentMinusIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import CardDropDown from './CardDropDown';

interface CardProps {
  title: string;
  description: string;
  checked: boolean;
}

const Card = ({ title, description, checked }: CardProps) => {
  const [done, setDone] = useState(checked);

  const checkTodo = () => {
    setDone((d) => !d);
  };

  return (
    <div className="m-3 max-w-sm rounded-md border border-white">
      <div className="flex items-center justify-between space-x-2 border-b p-4">
        <h2
          className={`prose text-2xl text-titleLight ${
            done && 'line-through decoration-2'
          }`}
        >
          {title}
        </h2>
        <div className="flex items-center justify-center space-x-2 p-2">
          {done ? (
            <DocumentMinusIcon
              className="h-6 w-6 text-red-600 hover:cursor-pointer hover:opacity-70"
              onClick={checkTodo}
            />
          ) : (
            <DocumentCheckIcon
              className="h-6 w-6 text-green-600 hover:cursor-pointer hover:opacity-70"
              onClick={checkTodo}
            />
          )}
          <CardDropDown />
        </div>
      </div>
      <div className="p-4">
        <p
          className={`prose font-serif text-xl text-white ${
            done && 'line-through decoration-2'
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
