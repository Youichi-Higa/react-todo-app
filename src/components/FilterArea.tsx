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
    <Box sx={{ width: "700px", mx:"auto" }}>
      <Tabs value={filterValue} onChange={handleChange} centered>
        <Tab label="全て" value="all" sx={{ fontSize: 16 }} />
        <Tab label="未完了" value="uncompleted" sx={{ fontSize: 16 }} />
        <Tab label="完了" value="completed" sx={{ fontSize: 16 }} />
      </Tabs>
    </Box>
  );
};
