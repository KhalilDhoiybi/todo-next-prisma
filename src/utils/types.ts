export type TodoInput = {
  title: string;
  description: string;
};

export interface TodosData {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export type ModalType = 'Add' | 'Delete' | 'Edit';
