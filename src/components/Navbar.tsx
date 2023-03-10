import { PlusIcon } from '@heroicons/react/24/solid';

interface NavbarProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: NavbarProps) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white py-4 px-10 md:px-24">
      <div className="flex content-center justify-between">
        <h1 className="text-5xl font-extrabold text-titleLight">Todos.</h1>
        <button
          className="rounded-md bg-titleLight px-5 py-2 text-white hover:bg-titleLightHover"
          onClick={onOpen}
        >
          <div className="flex items-center space-x-2">
            <p>Add New</p>
            <PlusIcon className="h-6 w-6 font-bold text-white" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
