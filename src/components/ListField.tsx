import { Box, Checkbox, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Todo } from 'src/types';

type Props = {
  title: string;
  todoList: Todo[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, todoId: number) => void;
  handleDelete: (todoId: number) => void;
};

export const ListField = (props: Props) => {
  const { title, todoList, handleCheckboxChange, handleDelete } = props;

  return (
    <Box
      sx={{
        width: '700px',
        mx: 'auto',
        my: 4,
        padding: 3,
        boxShadow: 3,
        borderRadius: 1,
      }}
    >
      <p>{title}</p>
      {todoList.map((todo) => (
        <Grid key={todo.id} container spacing={2}>
          <Grid item xs={1}>
            <Checkbox
              checked={todo.isCompleted}
              onChange={(e) => handleCheckboxChange(e, todo.id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item xs={3}>
            <div>{todo.title}</div>
          </Grid>
          <Grid item xs={7}>
            <div>{todo.content}</div>
          </Grid>
          <Grid item xs={1}>
            <DeleteIcon
              sx={{ cursor: 'pointer' }}
              color="disabled"
              onClick={() => handleDelete(todo.id)}
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};
