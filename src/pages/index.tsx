import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import AddNewModal from '@/components/AddNewModal';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import { TodosData } from '@/utils/types';
import toast, { Toaster } from 'react-hot-toast';
import DeleteModal from '@/components/DeleteModal';
import EditModal from '@/components/EditModal';

const getTodos = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/todos`);
    if (!res.ok) {
      throw new Error('Something went wrong');
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('getTodos', getTodos);
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

export default function Home() {
  const { data: todosData } = useQuery<TodosData[]>('getTodos', getTodos);
  const [addNewTodoModal, setAddNewTodoModal] = useState(false);
  const [deleteTodoModal, setDeleteTodoModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState<TodosData | null>(null);

  return (
    <>
      <Head>
        <title>Todos.</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar onOpenAddNewTodoModal={() => setAddNewTodoModal(true)} />
        <div
          className={`space relative top-24 mx-auto flex flex-wrap items-start justify-center p-6 md:w-4/6 ${
            (addNewTodoModal || deleteTodoModal || editTodoModal) && 'blur-sm'
          }`}
        >
          {!todosData ? (
            <div className="fixed top-0 flex h-screen items-center">
              <p className="text-3xl text-white opacity-60">
                You can add new todos with the "Add New" button above.
              </p>
            </div>
          ) : todosData.length !== 0 ? (
            todosData.map((todo) => (
              <Card
                key={todo.id}
                todo={todo}
                onOpenDeleteTodoModal={() => setDeleteTodoModal(true)}
                onOpeneEditTodoModal={() => setEditTodoModal(true)}
                onUpdateTodo={(todo: TodosData) => setTodoToUpdate(todo)}
                onDoneTodoError={(err) => {
                  toast.error(err);
                }}
              />
            ))
          ) : (
            <div className="fixed top-0 flex h-screen items-center">
              <p className="text-center text-3xl text-white opacity-60">
                You can add new todos with the "Add New" button above.
              </p>
            </div>
          )}
        </div>
        <AddNewModal
          isOpen={addNewTodoModal}
          onClose={() => setAddNewTodoModal(false)}
          onAddTodoError={(err) => {
            toast.error(err);
          }}
        />
        <DeleteModal
          isOpen={deleteTodoModal}
          onClose={() => {
            setDeleteTodoModal(false);
            setTodoToUpdate(null);
          }}
          onDeleteTodoError={(err) => {
            toast.error(err);
          }}
          todoToUpdate={todoToUpdate}
        />
        <EditModal
          isOpen={editTodoModal}
          onClose={() => {
            setEditTodoModal(false);
            setTodoToUpdate(null);
          }}
          onEditTodoError={(err) => {
            toast.error(err);
          }}
          todoToUpdate={todoToUpdate}
        />
        <Toaster />
      </main>
    </>
  );
}
