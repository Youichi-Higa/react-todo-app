import { Box, Button, Grid, Modal, Typography } from '@mui/material';
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
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
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

          <Grid
            container
            sx={{
              mb: 1,
              borderBottom: '1px solid #a9a9a9',
            }}
          >
            <Grid item xs={4}>
              <Typography variant="subtitle1" component="p">
                件名
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" component="p">
                内容
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{
              mb: 8,
            }}
          >
            <Grid item xs={4}>
              <Typography variant="subtitle1" component="p">
                {selectedTodo.title}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="subtitle1" component="p">
                {selectedTodo.content}
              </Typography>
            </Grid>
          </Grid>

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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={handleDeleteModalClose}
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
            <Button variant="contained" color="error" onClick={handleDelete} sx={{ width: 110 }}>
              削除
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
