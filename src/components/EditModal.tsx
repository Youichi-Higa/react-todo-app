import { Box, Button, Modal, TextField } from '@mui/material';
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
    <div>
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
          <div style={{ marginBottom: '16px' }}>
            <TextField
              id="title"
              name="title"
              label="件名"
              variant="outlined"
              multiline
              maxRows={4}
              sx={{ width: '100%' }}
              value={selectedTodo.title}
              onChange={handleSelectedTodoChange}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
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
          </div>
          <Button variant="contained" onClick={handleUpdate}>
            更新
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
