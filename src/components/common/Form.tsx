import React from 'react';
import Box from '@mui/material/Box';

export const Form = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}) => {
  return (
    <Box component='form' onSubmit={onSubmit}>
      {children}
    </Box>
  );
};
