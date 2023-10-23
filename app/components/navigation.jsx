'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../context/userContext';
import { useCartContext } from '../context/cartContext';
import ProductsMenu from './productsMenu';
import CartCard from './cartCard';
import SearchBar from './searchBar';
import { signOut, setPersistence, browserSessionPersistence } from "firebase/auth";
import CartIcon from './cartIcon';

const pages = ['Home'];
const settings = ['Account', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, setUser, auth } = useUserContext();
  const { cartOpen } = useCartContext();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserAccount = async (setting) => {
    if (setting === 'Account') {
      router.push('../account');
    };
    if (setting === 'Logout') {
      const userCredential = await setPersistence(auth, browserSessionPersistence)
        .then(async () => {
          await signOut(auth).then(() => {
          }).catch((error) => {
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      setUser(null);
    };
  };
  const handleMenuClick = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <AppBar position="static">
      {menuOpen ? <ProductsMenu /> : <></>}
      {cartOpen ? <CartCard /> : <></>}

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user !== null && typeof window !== 'undefined'
            ?
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>

            </>
            :
            typeof window !== 'undefined'
            &&
            <>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </>

          }

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {user !== null && pages.map((page) => (
              <Button
                key={page}
                onClick={() => (handleCloseNavMenu(), handleHome())}
                sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' } }}
              >
                {page}
              </Button>
            ))}
            {user !== null && typeof window !== 'undefined' && <div className='w-full flex justify-center'><SearchBar /></div>}

          </Box>
          {
            user !== null && typeof window !== 'undefined' &&
            <Box sx={{ flexGrow: 0 }}>
              <CartIcon />
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => (
                    handleCloseUserMenu,
                    handleUserAccount(setting)
                  )}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
