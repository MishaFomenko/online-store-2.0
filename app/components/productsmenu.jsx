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
  const [catOpen, setCatOpen] = React.useState(false)
  const [famOpen, setFamOpen] = React.useState(false)
  const [foodOpen, setFoodOpen] = React.useState(false)

  const handleCatClick = () => {
    setCatOpen(prev => (!prev));
  };
  const handleFamClick = () => {
    setFamOpen(prev => (!prev));
  };
  const handleFoodClick = () => {
    setFoodOpen(prev => (!prev));
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
        {catOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={catOpen} timeout="auto" unmountOnExit>
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
        {famOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={famOpen} timeout="auto" unmountOnExit>
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

      <ListItemButton onClick={handleFoodClick}>
        <ListItemIcon>
          <FastfoodIcon />
        </ListItemIcon>
        <ListItemText primary="Foods" />
        {foodOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={foodOpen} timeout="auto" unmountOnExit>
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
