import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Form } from '../../../components/common/Form';
import { useAppDispatch } from '../../../hooks';
import { createProduct } from '../ProductsSlice';
import { validationSchema } from '../ProductValidator';

export const ProductsForm = ({
  setFormOpen,
}: {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
      price: undefined,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(createProduct(values));
      formik.resetForm();
      setFormOpen(false);
    },
  });
  return (
    <Box sx={{ padding: '20px', margin: '20px 0' }} component={Paper}>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          margin='normal'
          fullWidth
          id='title'
          name='title'
          label='Name'
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          required
        />
        <TextField
          margin='normal'
          fullWidth
          id='description'
          name='description'
          label='Description'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          margin='normal'
          fullWidth
          id='price'
          name='price'
          label='Price'
          type='text'
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          required
        />
        <TextField
          margin='normal'
          fullWidth
          id='image'
          name='image'
          label='Product Image'
          type='file'
          inputProps={{ accept: 'image/jpg, image/jpeg, image/png' }}
          value={formik.values.image}
          onChange={formik.handleChange}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />

        <Stack mt={2} direction='row' spacing={2}>
          <Button variant='contained' type='submit'>
            Save
          </Button>

          <Button
            variant='outlined'
            onClick={() => {
              setFormOpen(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};
