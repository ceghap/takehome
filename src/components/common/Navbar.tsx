import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Navbar = ({ isPrivate = false }: { isPrivate?: boolean }) => {
  const renderNav = (isPrivate: boolean) => {
    switch (isPrivate) {
      case true:
        return (
          <>
            <Button component={Link} to='/products' color='inherit'>
              Product
            </Button>

            <Button component={Link} to='/profile' color='inherit'>
              Profile
            </Button>

            <Button component={Link} to='/logout' color='inherit'>
              Logout
            </Button>
          </>
        );
      default:
        return (
          <>
            <Button component={Link} to='/login' color='inherit'>
              Login
            </Button>

            <Button component={Link} to='/register' color='inherit'>
              Register
            </Button>
          </>
        );
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Take Home | Ashraf
          </Typography>
          {renderNav(isPrivate)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
