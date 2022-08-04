import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import type { FilterValue } from 'src/types';

type Props = {
  setFilterValue: Dispatch<SetStateAction<FilterValue>>;
};

export const FilterField = (props: Props) => {
  const { setFilterValue } = props;
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
        display: 'flex',
      }}
    >
      <div onClick={() => setFilterValue('all')} style={{ marginLeft: '16px' }}>
        全て
      </div>
      <div onClick={() => setFilterValue('uncompleted')} style={{ marginLeft: '16px' }}>
        未完了
      </div>
      <div onClick={() => setFilterValue('completed')} style={{ marginLeft: '16px' }}>
        完了
      </div>
    </Box>
  );
};
