import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { message } from 'src/constants';
import type { FormTodo, Todo } from 'src/types';

type Props = {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  handleSnackbarOpen: (_message: string) => void;
};

export const InputArea: React.FC<Props> = (props: Props) => {
  const { todoList, setTodoList, handleSnackbarOpen } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormTodo>();

  const onSubmit: SubmitHandler<FormTodo> = (data) => {
    // ユニークIDを生成
    const id = todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1;
    // newTodoをtodoListに追加して更新し、ローカルストレージに保存
    const newTodo = {
      id,
      title: data.title,
      content: data.content,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));

    // 成功メッセージを表示
    handleSnackbarOpen(message.success.save);

    reset();
  };

  return (
    <Box
      sx={{
        width: '45%',
        mx: 'auto',
        my: 2,
        p: 3,
        boxShadow: 3,
        borderRadius: 1,
        textAlign: 'center',
      }}
    >
      <TextField
        label="件名"
        variant="outlined"
        required
        multiline
        maxRows={4}
        {...register('title', {
          required: message.hookFormError.required,
          maxLength: { value: 20, message: message.hookFormError.maxLength20 },
        })}
        error={'title' in errors}
        helperText={errors.title?.message}
        sx={{ width: '100%', mb: 2 }}
      />
      <TextField
        label="内容"
        variant="outlined"
        multiline
        maxRows={4}
        {...register('content', {
          maxLength: { value: 50, message: message.hookFormError.maxLength50 },
        })}
        error={'content' in errors}
        helperText={errors.content?.message}
        sx={{ width: '100%', mb: 2 }}
      />
      <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
        保存
      </Button>
    </Box>
  );
};
