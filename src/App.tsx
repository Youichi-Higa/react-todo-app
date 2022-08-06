import { useEffect, useState } from 'react';
import './App.css';
import { EditModal, FilterField, InputField, ListField } from 'src/components';
import type { FilterValue, InputtedTodo, SelectedTodo, Todo } from 'src/types';

function App() {
  const defaultValues = { title: '', content: '' };
  const [inputtedTodo, setInputtedTodo] = useState<InputtedTodo>(defaultValues);
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>({ id: null, ...defaultValues });
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const uncompletedList = todoList.filter((todo) => !todo.isCompleted);
  const completedList = todoList.filter((todo) => todo.isCompleted);
  const [filterValue, setFilterValue] = useState<FilterValue>('all');
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

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
  const handleInputtedTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedTodo({ ...inputtedTodo, [e.target.name]: e.target.value });
  };
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

  // 入力値の保存
  const handleSave = () => {
    // TODO バリデーション
    if (inputtedTodo.title === '') return;
    // ユニークIDを生成
    const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
    const newTodo = {
      id,
      title: inputtedTodo.title,
      content: inputtedTodo.content,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    const newTodoList = [...todoList, newTodo];
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
    setInputtedTodo(defaultValues);
  };

  // 編集モーダルの制御
  const handleEdit = (_selectedTodo: SelectedTodo) => {
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

  // 削除
  const handleDelete = (todoId: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };

  // 初回レンダリング時にローカルストレージからデータ取得
  useEffect(() => {
    const localStorageData = localStorage.getItem('todo-list');
    if (localStorageData) {
      setTodoList(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <div className="App">
      <InputField
        inputtedTodo={inputtedTodo}
        handleInputtedTodoChange={handleInputtedTodoChange}
        handleSave={handleSave}
      />
      <FilterField setFilterValue={setFilterValue} />
      {filterValue !== 'completed' && (
        <ListField
          title={'未完了'}
          todoList={descUncompletedList}
          handleCheckboxChange={handleCheckboxChange}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {filterValue !== 'uncompleted' && (
        <ListField
          title={'完了'}
          todoList={descCompletedList}
          handleCheckboxChange={handleCheckboxChange}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}

      <EditModal
        selectedTodo={selectedTodo}
        handleSelectedTodoChange={handleSelectedTodoChange}
        editModalOpen={editModalOpen}
        handleEditModalClose={handleEditModalClose}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
