import { useEffect, useState } from 'react';
import './App.css';
import { InputField, ListField } from 'src/components';
import type { InputtedTodo, Todo } from 'src/types';

function App() {
  const [inputtedTodo, setInputtedTodo] = useState<InputtedTodo>({ title: '', content: '' });
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const completedList = todoList.filter((todo) => todo.isCompleted);
  const uncompletedList = todoList.filter((todo) => !todo.isCompleted);
  console.log('completedList', completedList);
  console.log('uncompletedList', uncompletedList);

  const handleChangeInputtedTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedTodo({ ...inputtedTodo, [e.target.name]: e.target.value });
  };

  // 保存ボタンを押したときの処理
  const handleSave = () => {
    // ユニークIDを生成
    const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
    const newTodo = {
      id,
      title: inputtedTodo.title,
      content: inputtedTodo.content,
      isCompleted: true,
      createdAt: new Date(),
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
        handleChangeInputtedTodo={handleChangeInputtedTodo}
        handleSave={handleSave}
      />
      <ListField title={'完了'} todoList={uncompletedList} />
      <ListField title={'未完了'} todoList={completedList} />
    </div>
  );
}

export default App;
