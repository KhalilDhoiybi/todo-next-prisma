import PopOutModal from './PopOutModal';

interface AddNewModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onAddTodoError: (err: string) => void;
}

const DeleteModal = ({ isOpen, onClose }: AddNewModalProps) => {
  return (
    <div>
      <PopOutModal
        modalTitle="Are you sure to delete this Todo ?"
        isOpen={isOpen}
        onClose={onClose}
        modalType="Delete"
      >
        <div className="flex justify-end space-x-4 px-5 pb-4">
          <button className="rounded-md bg-titleLight px-3 py-1 text-white hover:bg-titleLightHover">
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
