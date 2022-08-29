import React from 'react';
import { Form } from '../../../components/common/Form';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';

export const ActivateAccountForm = () => {
  const formik = useFormik({
    initialValues: {
      code: 0,
    },
    validationSchema: Yup.object({
      code: Yup.number().min(6).required(),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label='2FA code'
          margin='normal'
          type='text'
          name='code'
          id='code'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
          helperText={formik.touched.code && formik.errors.code}
        />
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Verify
        </Button>
      </Form>
    </>
  );
};
