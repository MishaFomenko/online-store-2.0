import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShortTextIcon from '@mui/icons-material/ShortText';
import Link from 'next/link'


export default function ProductsMenu() {
  const initOpen = {
    catOpen: false,
    famOpen: false,
    fooOpen: false,
  }
  const [open, setOpen] = React.useState(initOpen);

  const handleCatClick = () => {
    setOpen(prev => ({ ...prev, catOpen: !prev.catOpen }));
  };
  const handleFamClick = () => {
    setOpen(prev => ({ ...prev, famOpen: !prev.famOpen }));
  };
  const handleFooClick = () => {
    setOpen(prev => ({ ...prev, fooOpen: !prev.fooOpen }));
  };

  const categories = ['Accessories', 'Bags', 'Pants', 'Shoes', 'Hats', 'Beauty', 'Glasses', 'Jackets', 'Jeans', 'Jwewlry', 'Shirts', 'Shorts', 'Underwear', 'Watches'];
  const family = ['Men', 'Women'];
  const foods = ['Bakery', 'Beverages', 'Dairy', 'Fruits', 'Meat', 'Seafood', 'Snacks', 'Vegetables'];

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'absolute',
        color: 'black',
        marginTop: '70px',
        borderWidth: '2px',
        zIndex: 1,
        overflow: 'auto',
        maxHeight: 600
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Products Menu
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleCatClick}>
        <ListItemIcon>
          <CheckroomIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
        {open.catOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.catOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.sort().map((item, ind) =>
            <Link href={`/${item}`} key={ind}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ShortTextIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>

      <ListItemButton onClick={handleFamClick}>
        <ListItemIcon>
          <FamilyRestroomIcon />
        </ListItemIcon>
        <ListItemText primary="Family" />
        {open.famOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.famOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {family.sort().map((item, ind) =>
            <Link href={`/${item}`} key={ind}>
              <ListItemButton sx={{ pl: 4 }} key={ind}>
                <ListItemIcon>
                  <ShortTextIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>

      <ListItemButton onClick={handleFooClick}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="Foods" />
        {open.fooOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.fooOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {foods.sort().map((item, ind) =>
            <Link href={`/${item}`} key={ind}>
              <ListItemButton sx={{ pl: 4 }} key={ind}>
                <ListItemIcon>
                  <ShortTextIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          )}
        </List>
      </Collapse>
    </List>
  );
}
