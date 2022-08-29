import React from 'react'
import { Navbar } from '../../components/common/Navbar'
import { Outlet } from 'react-router'
import Container from '@mui/material/Container'

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth='md'>
        <Outlet />
      </Container>
    </>
  )
}
