import { Dispatch, SetStateAction } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import type { FilterValue } from 'src/types';

type Props = {
  filterValue: FilterValue;
  setFilterValue: Dispatch<SetStateAction<FilterValue>>;
};

export const FilterArea = (props: Props) => {
  const { filterValue, setFilterValue } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: FilterValue) => {
    setFilterValue(newValue);
  };

  return (
    <Box sx={{ width: '45%', mx: 'auto', bgcolor: 'background.paper' }}>
      <Tabs value={filterValue} onChange={handleChange} centered>
        <Tab label="全て" value="all" />
        <Tab label="未完了" value="uncompleted" />
        <Tab label="完了" value="completed" />
      </Tabs>
    </Box>
  );
};
