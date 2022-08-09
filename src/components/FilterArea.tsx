import { Dispatch, SetStateAction } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import type { FilterValue } from 'src/types';

type Props = {
  filterValue: FilterValue;
  setFilterValue: Dispatch<SetStateAction<FilterValue>>;
  todoCounts: { allTodo: number; uncompletedTodo: number; completedTodo: number };
};

export const FilterArea = (props: Props) => {
  const { filterValue, setFilterValue, todoCounts } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: FilterValue) => {
    setFilterValue(newValue);
  };

  return (
    <Box sx={{ width: '42%', mx: 'auto' }}>
      <Tabs value={filterValue} onChange={handleChange} centered>
        <Tab label={`全て(${todoCounts.allTodo}件)`} value="all" sx={{ fontSize: 16 }} />
        <Tab
          label={`未完了(${todoCounts.uncompletedTodo}件)`}
          value="uncompleted"
          sx={{ fontSize: 16 }}
        />
        <Tab
          label={`完了(${todoCounts.completedTodo}件)`}
          value="completed"
          sx={{ fontSize: 16 }}
        />
      </Tabs>
    </Box>
  );
};
