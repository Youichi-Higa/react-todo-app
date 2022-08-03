import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { Todo } from 'src/types';

type Props = {
  title: string;
  todoList: Todo[];
};

export const ListField = (props: Props) => {
  const { title, todoList } = props;

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
          <Grid item xs={4}>
            <div>{todo.title}</div>
          </Grid>
          <Grid item xs={8}>
            <div>{todo.content}</div>
          </Grid>
        </Grid>
      ))}
      <Button variant="contained">保存</Button>
    </Box>
  );
};
