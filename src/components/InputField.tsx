import { Box, Button, TextField } from '@mui/material';

import type { InputtedTodo } from 'src/types';

type Props = {
  inputtedTodo: InputtedTodo;
  handleInputtedTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
};

export const InputField: React.FC<Props> = (props: Props) => {
  const { inputtedTodo, handleInputtedTodoChange, handleSave } = props;

  return (
    <Box
      component="form"
      sx={{
        width: '700px',
        mx: 'auto',
        my: 2,
        p: 3,
        boxShadow: 3,
        borderRadius: 1,
        textAlign: 'center',
      }}
    >
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
          value={inputtedTodo.title}
          onChange={handleInputtedTodoChange}
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
          value={inputtedTodo.content}
          onChange={handleInputtedTodoChange}
        />
      </Box>
      <Button variant="contained" onClick={handleSave}>
        保存
      </Button>
    </Box>
  );
};
