import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import type { SelectedTodo } from 'src/types';

type Props = {
  selectedTodo: SelectedTodo;
  handleSelectedTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  handleUpdate: () => void;
};

export const EditModal: React.FC<Props> = (props: Props) => {
  const {
    selectedTodo,
    handleSelectedTodoChange,
    editModalOpen,
    handleEditModalClose,
    handleUpdate,
  } = props;
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
          <Box sx={{ mb: 3 }}>
            <TextField
              id="title"
              name="title"
              label="件名"
              variant="outlined"
              required
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              value={selectedTodo.title}
              onChange={handleSelectedTodoChange}
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <TextField
              id="content"
              name="content"
              label="内容"
              variant="outlined"
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              value={selectedTodo.content}
              onChange={handleSelectedTodoChange}
            />
          </Box>
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
          <Button sx={{ width: 110 }} variant="contained" onClick={handleUpdate}>
            更新
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
