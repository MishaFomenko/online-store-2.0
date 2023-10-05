import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from '../context/cartContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  }
}));

export default function CartIcon() {
  const { cart, setCartOpen } = useCartContext();
  const handleCartClick = () => {
    setCartOpen(prev => !prev);
  }
  return (
    <IconButton aria-label="cart" className='mr-10' onClick={handleCartClick}>
      <StyledBadge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon sx={{ color: 'white' }} />
      </StyledBadge>
    </IconButton>
  );
}
