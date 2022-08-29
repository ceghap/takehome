import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { Product, fetchProducts, fetchAllProducts, setPage, setSize } from '../ProductsSlice';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export const ProductsTable = () => {
  const pagination = useAppSelector((state) => state.product.pagination);
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setSize(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  function TablePaginationActions() {
    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      handleChangePage(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      handleChangePage(event, pagination.page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      handleChangePage(event, pagination.page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      handleChangePage(event, Math.max(0, Math.ceil(pagination.count / pagination.size) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={pagination.page === 0}
          aria-label='first page'
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={pagination.page === 0}
          aria-label='previous page'
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={pagination.page >= Math.ceil(pagination.count / pagination.size) - 1}
          aria-label='next page'
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={pagination.page >= Math.ceil(pagination.count / pagination.size) - 1}
          aria-label='last page'
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    );
  }

  useEffect(() => {
    if (pagination.size === -1) {
      dispatch(fetchAllProducts());
    } else {
      dispatch(fetchProducts({ limit: pagination.size, page: pagination.page }));
    }
  }, [dispatch, pagination]);
  return (
    <>
      {products && (
        <TableContainer sx={{ margin: '20px 0' }} component={Paper}>
          {products.loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          )}
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
                !products.loading &&
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
                  count={pagination.count!}
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  rowsPerPage={pagination.size}
                  page={pagination.page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
