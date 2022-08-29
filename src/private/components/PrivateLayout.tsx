import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Outlet } from 'react-router';
import Container from '@mui/material/Container';

export const PrivateLayout = () => {
  return (
    <>
      <Navbar isPrivate />
      <Container maxWidth='md'>
        <Outlet />
      </Container>
    </>
  );
};
