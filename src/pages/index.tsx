import AddNewModal from '@/components/AddNewModal';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import { TodoInput } from '@/utils/types';
import Head from 'next/head';
import { useState } from 'react';
import todos from '@/lib/data/todos.json';

interface TodosData {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

export default function Home() {
  const [todosData, setTodosData] = useState<TodosData[] | []>(todos);
  const [addNewTodoModal, setAddNewTodoModal] = useState(false);

  return (
    <>
      <Head>
        <title>Todos.</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar onOpen={() => setAddNewTodoModal(true)} />
        <div
          className={`space relative top-24 mx-auto flex flex-wrap justify-center p-6 md:w-4/6 ${
            addNewTodoModal && 'blur-sm'
          }`}
        >
          {todosData.length !== 0 ? (
            todosData.map((todo) => (
              <Card
                key={todo.id}
                title={todo.title}
                description={todo.description}
                checked={todo.done}
              />
            ))
          ) : (
            <div className="fixed top-0 flex h-screen items-center">
              <p className="text-3xl text-white opacity-60">
                You can add new todos with the "Add New" button above.
              </p>
            </div>
          )}
        </div>
        <AddNewModal
          isOpen={addNewTodoModal}
          onClose={() => setAddNewTodoModal(false)}
          onAddTodoSuccess={(data: TodoInput) => {
            setAddNewTodoModal(false);
            console.log(data);
          }}
        />
      </main>
    </>
  );
}
