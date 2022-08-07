import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { hookFormErrorMessage } from 'src/constants';
import type { SelectedTodo, Todo } from 'src/types';

type Props = {
  todoList: Todo[];
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  useFormReturn: UseFormReturn<SelectedTodo>;
};

export const EditModal: React.FC<Props> = (props: Props) => {
  const { todoList, setTodoList, editModalOpen, handleEditModalClose, useFormReturn } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormReturn;

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
          <TextField
            label="件名"
            variant="outlined"
            required
            multiline
            maxRows={4}
            {...register('title', {
              required: hookFormErrorMessage.required,
              maxLength: { value: 20, message: hookFormErrorMessage.maxLength20 },
            })}
            error={'title' in errors}
            helperText={errors.title?.message}
            sx={{ width: '100%', mb: 3 }}
          />
          <TextField
            label="内容"
            variant="outlined"
            multiline
            maxRows={4}
            {...register('content', {
              maxLength: { value: 50, message: hookFormErrorMessage.maxLength50 },
            })}
            error={'content' in errors}
            helperText={errors.content?.message}
            sx={{ width: '100%', mb: 5 }}
          />
          <input type="hidden" name="id" />
          <Button
            variant="contained"
            onClick={handleEditModalClose}
            sx={{
              width: 110,
              backgroundColor: 'gray',
              mr: 4,
              '&:hover': {
                backgroundColor: 'gray',
              },
            }}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ width: 110 }}
          >
            更新
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
