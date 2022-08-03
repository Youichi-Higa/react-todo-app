import { useEffect, useState } from 'react';
import './App.css';
import { InputField, ListField } from 'src/components';
import type { Todo } from 'src/types';

function App() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const completedList = todoList.filter((todo) => todo.isCompleted);
  const uncompletedList = todoList.filter((todo) => !todo.isCompleted);
  console.log('completedList', completedList);
  console.log('uncompletedList', uncompletedList);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // 保存ボタンを押したときの処理
  const handleSave = () => {
    // ユニークIDを生成
    const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
    const newTodo = {
      id,
      title,
      content,
      isCompleted: true,
      createdAt: new Date(),
      updatedAt: null,
    };
    const newTodoList = [...todoList, newTodo];
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };

  // 初回レンダリング時にローカルストレージからデータを取得
  useEffect(() => {
    const localStorageData = localStorage.getItem('todo-list');
    if (localStorageData) {
      setTodoList(JSON.parse(localStorageData));
    }
  }, []);

  return (
    <div className="App">
      <InputField
        handleChangeTitle={handleChangeTitle}
        handleChangeContent={handleChangeContent}
        handleSave={handleSave}
      />
      <ListField title={"完了"} todoList={uncompletedList} />
      <ListField title={"未完了"} todoList={completedList} />
    </div>
  );
}

export default App;
