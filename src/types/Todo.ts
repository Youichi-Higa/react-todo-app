export type Todo = {
  id: number;
  title: string;
  content: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type InputtedTodo = Pick<Todo, 'title' | 'content'>;

export type SelectedTodo = { id: number | null } & InputtedTodo;
