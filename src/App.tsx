import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { DeleteModal, EditModal, FilterArea, InputArea, ListArea } from 'src/components';
import { message } from 'src/constants';
import type { FilterValue, SelectedTodo, Todo } from 'src/types';

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const uncompletedList = todoList.filter((todo) => !todo.isCompleted);
  const completedList = todoList.filter((todo) => todo.isCompleted);
  const [selectedTodo, setSelectedTodo] = useState<SelectedTodo>({
    id: undefined,
    title: '',
    content: '',
  });
  const [filterValue, setFilterValue] = useState<FilterValue>('all');
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const useFormReturn = useForm<SelectedTodo>();
  const { setValue, reset } = useFormReturn;

  // 日時を降順にする関数
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

  // チェックボックスの変更を制御
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
    const newTodoList = [...todoList];
    // クリックされたtodoのindexを取得してtodoListを更新し、ローカルストレージに保存
    const index = newTodoList.findIndex((todo) => todo.id === todoId);
    newTodoList[index].isCompleted = e.target.checked;
    newTodoList[index].updatedAt = new Date().toISOString();
    setTodoList(newTodoList);
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
  };

  // 編集モーダルの制御
  const handleEditModalOpen = (_selectedTodo: SelectedTodo) => {
    // フォームに値をセット
    setValue('id', _selectedTodo.id);
    setValue('title', _selectedTodo.title);
    setValue('content', _selectedTodo.content);

    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    reset();
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
    // 選択されたtodoを削除してtodoListを更新し、ローカルストレージに保存
    const newTodoList = todoList.filter((todo) => todo.id !== selectedTodo.id);
    setTodoList(newTodoList);
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));

    // 成功メッセージを表示
    handleSnackbarOpen(message.success.delete);

    setDeleteModalOpen(false);
  };

  // 成功メッセージの制御
  const handleSnackbarOpen = (_message: string) => {
    setSnackbarMessage(_message);
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
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
      {/* アプリ名 */}
      <Box
        sx={{
          m: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          TODO App
        </Typography>
      </Box>

      {/* 入力エリア */}
      <InputArea
        todoList={todoList}
        setTodoList={setTodoList}
        handleSnackbarOpen={handleSnackbarOpen}
      />

      {/* フィルターエリア */}
      <FilterArea filterValue={filterValue} setFilterValue={setFilterValue} />

      {/* 完了エリア */}
      {filterValue !== 'completed' && (
        <ListArea
          areaTitle={'未完了'}
          todoList={descUncompletedList}
          handleCheckboxChange={handleCheckboxChange}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
        />
      )}
      {/* 未完了エリア */}
      {filterValue !== 'uncompleted' && (
        <ListArea
          areaTitle={'完了'}
          todoList={descCompletedList}
          handleCheckboxChange={handleCheckboxChange}
          handleEditModalOpen={handleEditModalOpen}
          handleDeleteModalOpen={handleDeleteModalOpen}
        />
      )}

      {/* モーダル */}
      <EditModal
        todoList={todoList}
        setTodoList={setTodoList}
        editModalOpen={editModalOpen}
        handleEditModalClose={handleEditModalClose}
        handleSnackbarOpen={handleSnackbarOpen}
        useFormReturn={useFormReturn}
      />
      <DeleteModal
        selectedTodo={selectedTodo}
        deleteModalOpen={deleteModalOpen}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDelete={handleDelete}
      />

      {/* 成功メッセージ */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          variant="filled"
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
