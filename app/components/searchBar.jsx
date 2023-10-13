import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [kw, setKw] = React.useState('');
  const route = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setKw('');
    route.push(`/searched/${data.get('keyword')}`);
  }
  const handleChange = (event) => {
    setKw(event.target.value);
  }
  return (
    <Paper
      component="form"
      onSubmit={e => handleSubmit(e)}
      sx={{ p: '2px 4px', m: '10px 0px', display: 'flex', alignItems: 'center', width: { sx: 80, md: 300 } }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search products"
        inputProps={{ 'aria-label': 'search products' }}
        name='keyword'
        id='keyword'
        value={kw}
        onChange={e => handleChange(e)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
