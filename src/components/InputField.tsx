import { Dispatch, SetStateAction } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import type { FormTodo, Todo } from 'src/types';

type Props = {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
};

export const InputField: React.FC<Props> = (props: Props) => {
  const { todoList, setTodoList } = props;

  const { control, handleSubmit, reset } = useForm<FormTodo>();

  const onSubmit: SubmitHandler<FormTodo> = (data) => {
    // TODO バリデーション
    if (data.title === '') return;
    // ユニークIDを生成
    const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
    const newTodo = {
      id,
      title: data.title,
      content: data.content,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    const newTodoList = [...todoList, newTodo];
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '700px',
        mx: 'auto',
        my: 2,
        p: 3,
        boxShadow: 3,
        borderRadius: 1,
        textAlign: 'center',
      }}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Box sx={{ mb: 3 }}>
            <TextField
              label="件名"
              variant="outlined"
              required
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              {...field}
            />
          </Box>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <Box sx={{ mb: 3 }}>
            <TextField
              label="内容"
              variant="outlined"
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              {...field}
            />
          </Box>
        )}
      />
      <Button type="submit" variant="contained">
        保存
      </Button>
    </Box>
  );
};
