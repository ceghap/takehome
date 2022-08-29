import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Product, Products } from '../ProductsSlice';

export const ProductsTable = ({ products }: { products: Products }) => {
  const handleChangePage = () => {
    console.log('a');
  };
  const handleChangeRowsPerPage = () => {
    console.log('a');
  };
  const TablePaginationActions = () => {
    console.log('a');
  };
  return (
    <TableContainer sx={{ margin: '20px 0' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Name</TableCell>
            <TableCell align='left'>Description</TableCell>
            <TableCell align='left'>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.data?.map((product: Product) => (
              <TableRow
                key={product._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>{product.title}</TableCell>
                <TableCell align='left'>{product.description}</TableCell>
                <TableCell align='left'>{product.image}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              count={products.totalProducts!}
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              rowsPerPage={products.limit!}
              page={products.page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
