import {
  Cog6ToothIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CardProps } from './Card';

const CardDropDown = ({
  todo,
  onOpenDeleteTodoModal,
  onUpdateTodo
}: CardProps) => {
  return (
    <Menu as="div" className="relative flex justify-center text-left">
      <Menu.Button>
        <Cog6ToothIcon className="h-6 w-6 text-slate-400 hover:opacity-70" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-7 flex rounded-lg bg-white shadow-md shadow-black">
          <Menu.Item>
            <div
              className="rounded-tl-lg rounded-bl-lg p-4 hover:cursor-pointer hover:bg-slate-300"
              onClick={() => alert('Test from edit')}
            >
              <PencilSquareIcon className="h-6 w-6 text-blue-500" />
            </div>
          </Menu.Item>
          <Menu.Item>
            <div
              className="rounded-tr-lg rounded-br-lg p-4 hover:cursor-pointer hover:bg-slate-300"
              onClick={() => {
                onUpdateTodo(todo);
                onOpenDeleteTodoModal();
              }}
            >
              <TrashIcon className="h-6 w-6 text-titleLight" />
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CardDropDown;
