import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import type { SelectedTodo } from 'src/types';

type Props = {
  selectedTodo: SelectedTodo;
  deleteModalOpen: boolean;
  handleDeleteModalClose: () => void;
  handleDelete: () => void;
};

export const DeleteModal: React.FC<Props> = (props: Props) => {
  const { selectedTodo, deleteModalOpen, handleDeleteModalClose, handleDelete } = props;
  return (
    <div>
      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
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
              削除
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              id="title"
              name="title"
              label="件名"
              variant="outlined"
              disabled
              required
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              value={selectedTodo.title}
            />
          </Box>
          <Box sx={{ mb: 5 }}>
            <TextField
              id="content"
              name="content"
              label="内容"
              variant="outlined"
              disabled
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              value={selectedTodo.content}
            />
          </Box>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" component="p">
              本当に削除しますか？
            </Typography>
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
            onClick={handleDeleteModalClose}
          >
            キャンセル
          </Button>
          <Button sx={{ width: 110 }} variant="contained" color="error" onClick={handleDelete}>
            削除
          </Button>
        </Box>
      </Modal>
    </div>
  );
};