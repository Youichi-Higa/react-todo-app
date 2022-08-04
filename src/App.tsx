import { useEffect, useState } from 'react';
import './App.css';
import { InputField, ListField } from 'src/components';
import type { InputtedTodo, Todo } from 'src/types';

function App() {
  const [inputtedTodo, setInputtedTodo] = useState<InputtedTodo>({ title: '', content: '' });
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const uncompletedList = todoList.filter((todo) => !todo.isCompleted);
  const completedList = todoList.filter((todo) => todo.isCompleted);

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

  const handleInputtedTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedTodo({ ...inputtedTodo, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex((todo) => todo.id === todoId);
    newTodoList[index].isCompleted = e.target.checked;
    newTodoList[index].updatedAt = new Date().toISOString();
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };

  // 保存ボタンを押したときの処理
  const handleSave = () => {
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
    setInputtedTodo({ title: '', content: '' });
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
      <ListField
        title={'未完了'}
        todoList={descUncompletedList}
        handleCheckboxChange={handleCheckboxChange}
      />
      <ListField
        title={'完了'}
        todoList={descCompletedList}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

export default App;
