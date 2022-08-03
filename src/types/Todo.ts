export type Todo = {
  id: number;
  title: string;
  content: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};
