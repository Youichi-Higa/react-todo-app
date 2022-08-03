import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = {
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
};

export const InputField = (props: Props) => {
  const { handleChangeTitle, handleChangeContent, handleSave } = props;

  return (
    <Box
      component="form"
      sx={{
        width: '700px',
        mx: 'auto',
        my: 4,
        padding: 3,
        boxShadow: 3,
        borderRadius: 1,
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <TextField
          id="title"
          label="件名"
          variant="outlined"
          multiline
          maxRows={4}
          sx={{ width: '100%' }}
          onChange={handleChangeTitle}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          id="title"
          label="内容"
          variant="outlined"
          multiline
          maxRows={4}
          sx={{ width: '100%' }}
          onChange={handleChangeContent}
        />
      </div>
      <Button variant="contained" onClick={handleSave}>
        保存
      </Button>{' '}
    </Box>
  );
};
