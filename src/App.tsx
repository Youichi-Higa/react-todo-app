import { useEffect, useState } from 'react';
import { DeleteModal, EditModal, FilterField, InputField, ListField } from 'src/components';
import type { FilterValue, SelectedTodo, Todo } from 'src/types';

function App() {
  const defaultValues = { id: null, title: '', content: '' };
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>(defaultValues);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const uncompletedList = todoList.filter((todo) => !todo.isCompleted);
  const completedList = todoList.filter((todo) => todo.isCompleted);
  const [filterValue, setFilterValue] = useState<FilterValue>('all');
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  // 日付を降順にする関数
  const sortDescendingDate = (_todoList: Todo[]) => {
    _todoList.sort((a, b) => {
      const aDate = a.updatedAt === null ? a.createdAt : a.updatedAt;
      const bDate = b.updatedAt === null ? b.createdAt : b.updatedAt;
      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });
    return _todoList;
  };
  const descUncompletedList = sortDescendingDate(uncompletedList);
  const descCompletedList = sortDescendingDate(completedList);

  // 入力値と編集値の変更を制御
  const handleSelectedTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTodo({ ...selectedTodo, [e.target.name]: e.target.value });
  };

  // チェックボックスの変更を制御
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex((todo) => todo.id === todoId);
    newTodoList[index].isCompleted = e.target.checked;
    newTodoList[index].updatedAt = new Date().toISOString();
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };

  // 編集モーダルの制御
  const handleEditModalOpen = (_selectedTodo: SelectedTodo) => {
    setSelectedTodo(_selectedTodo);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  // 更新
  const handleUpdate = () => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex((todo) => todo.id === selectedTodo.id);
    newTodoList[index].title = selectedTodo.title;
    newTodoList[index].content = selectedTodo.content;
    newTodoList[index].updatedAt = new Date().toISOString();
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
    setEditModalOpen(false);
  };

  // 削除モーダルの制御
  const handleDeleteModalOpen = (_selectedTodo: SelectedTodo) => {
    setSelectedTodo(_selectedTodo);
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  // 削除
  const handleDelete = () => {
    const newTodoList = todoList.filter((todo) => todo.id !== selectedTodo.id);
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
    setDeleteModalOpen(false);
  };

  // 初回レンダリング時にローカルストレージからデータ取得
  useEffect(() => {
    const localStorageData = localStorage.getItem('todo-list');
    if (localStorageData) {
      setTodoList(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <>
      <InputField todoList={todoList} setTodoList={setTodoList} />
      <FilterField filterValue={filterValue} setFilterValue={setFilterValue} />
      {filterValue !== 'completed' && (
        <ListField
          title={'未完了'}
          todoList={descUncompletedList}
          handleCheckboxChange={handleCheckboxChange}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
        />
      )}
      {filterValue !== 'uncompleted' && (
        <ListField
          title={'完了'}
          todoList={descCompletedList}
          handleCheckboxChange={handleCheckboxChange}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
        />
      )}

      {/* モーダル */}
      <EditModal
        selectedTodo={selectedTodo}
        handleSelectedTodoChange={handleSelectedTodoChange}
        editModalOpen={editModalOpen}
        handleEditModalClose={handleEditModalClose}
        handleUpdate={handleUpdate}
      />
      <DeleteModal
        selectedTodo={selectedTodo}
        deleteModalOpen={deleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
