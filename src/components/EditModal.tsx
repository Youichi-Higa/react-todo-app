import { Dispatch, SetStateAction } from 'react';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import type { SelectedTodo, Todo } from 'src/types';

type Props = {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  useFormReturn: UseFormReturn<SelectedTodo>;
};

export const EditModal: React.FC<Props> = (props: Props) => {
  const {
    todoList,
    setTodoList,
    editModalOpen,
    handleEditModalClose,
    useFormReturn,
  } = props;

  const { control, handleSubmit, reset } = useFormReturn;

  const onSubmit: SubmitHandler<SelectedTodo> = (data) => {
    const newTodoList = [...todoList];
    const index = newTodoList.findIndex((todo) => todo.id === data.id);
    newTodoList[index].title = data.title;
    newTodoList[index].content = data.content;
    newTodoList[index].updatedAt = new Date().toISOString();
    localStorage.setItem('todo-list', JSON.stringify(newTodoList));
    setTodoList(newTodoList);
    handleEditModalClose();
    reset();
  };

  return (
    <Box>
      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="h1">
              編集
            </Typography>
          </Box>
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
              <Box sx={{ mb: 5 }}>
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
          <input type="hidden" name="id" />
          <Button
            sx={{
              width: 110,
              backgroundColor: 'gray',
              mr: 4,
              '&:hover': {
                backgroundColor: 'gray',
              },
            }}
            variant="contained"
            disableElevation
            onClick={handleEditModalClose}
          >
            キャンセル
          </Button>
          <Button type="submit" sx={{ width: 110 }} variant="contained">
            更新
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
