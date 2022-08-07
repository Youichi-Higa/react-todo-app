import { Box, Checkbox, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { SelectedTodo, Todo } from 'src/types';

type Props = {
  areaTitle: string;
  todoList: Todo[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, todoId: number) => void;
  handleEditModalOpen: (selectedTodo: SelectedTodo) => void;
  handleDeleteModalOpen: (selectedTodo: SelectedTodo) => void;
};

export const ListField = (props: Props) => {
  const { areaTitle, todoList, handleCheckboxChange, handleEditModalOpen, handleDeleteModalOpen } =
    props;

  return (
    <Box
      sx={{
        width: '700px',
        mx: 'auto',
        my: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 1,
      }}
    >
      {/* エリアタイトル */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" component="h1">
          {areaTitle}
        </Typography>
      </Box>

      {/* todoがあればテーブルヘッダーを表示し、なければその旨を表示 */}
      {todoList.length > 0 ? (
        <Box
          sx={{
            mb: 1,
            borderBottom: '1px solid #CCCCCC',
          }}
        >
          <Grid container spacing={2}>
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
        </Box>
      ) : (
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" component="p">
            {`${areaTitle}はありません`}
          </Typography>
        </Box>
      )}

      {/* リスト部分 */}
      {todoList.map((todo) => (
        <Grid key={todo.id} container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <Checkbox
              checked={todo.isCompleted}
              onChange={(e) => handleCheckboxChange(e, todo.id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item xs={3}>
            <Box>{todo.title}</Box>
          </Grid>
          <Grid item xs={6}>
            <Box>{todo.content}</Box>
          </Grid>
          <Grid item xs={2}>
            <EditIcon
              sx={{ cursor: 'pointer', mx: 1 }}
              onClick={() =>
                handleEditModalOpen({ id: todo.id, title: todo.title, content: todo.content })
              }
            />
            <DeleteIcon
              sx={{ cursor: 'pointer', mx: 1 }}
              color="disabled"
              onClick={() =>
                handleDeleteModalOpen({ id: todo.id, title: todo.title, content: todo.content })
              }
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
