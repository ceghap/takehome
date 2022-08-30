import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { ProductsForm } from './components/ProductsForm';
import { ProductsTable } from './components/ProductsTable';

export const ProductsView = () => {
  const [formOpen, setFormOpen] = useState(false);

  const product = useAppSelector((state) => state.product.product);

  return (
    <>
      <Alert severity='info' sx={{ margin: '20px 0' }}>
        API from https://api.storerestapi.com/products?limit=10&page=0. Every page change, this API
        returns same response
      </Alert>
      <Alert severity='info' sx={{ margin: '20px 0' }}>
        Creating new product wont update the API response. The table updated only after it is
        success the post req to create app. when the page &quot;refresh&quot; the fetch function did
        not get the created product.
      </Alert>

      <h1>Products</h1>

      {product.loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      <Button variant='contained' onClick={() => setFormOpen(true)}>
        Add Product
      </Button>

      {formOpen && <ProductsForm setFormOpen={setFormOpen} />}

      <ProductsTable />
    </>
  );
};
