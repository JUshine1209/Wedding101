import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectBox(props) {
// const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    console.log(props.order);
    console.log(event.target.value);
    props.setOrder(event.target.value);
    console.log(props.setOrder());
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-label">정렬조건</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={props.order}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={'name'}>이름</MenuItem>
          <MenuItem value={'createdAt'}>날짜</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default SelectBox;