import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (query: { limit: number; page: number }) => {
    const response = await axios.get(
      `https://api.storerestapi.com/products?limit=${query.limit}&page=${query.page}`,
    );
    return response.data;
  },
);

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get('https://api.storerestapi.com/products');
  return response.data;
});

export const createProduct = createAsyncThunk('product/create', async (values: Product) => {
  const body = {
    title: values.title,
    description: values.description,
    price: Number(values.price),
    image: 'https://via.placeholder.com/600x400',
  };

  const response = await axios.post<{ data: Product }>(
    'https://api.storerestapi.com/products',
    body,
    {
      headers: {
        'Content-type': 'application/json',
      },
    },
  );

  return response.data.data as Product;
});

export interface Product {
  _id?: string;
  title: string;
  description: string;
  image: string;
  price: number | undefined;
}

export interface Products {
  loading: boolean;
  data: Product[] | undefined;
  error: SerializedError | null;
}
interface Pagination {
  size: number;
  page: number;
  count: number;
  totalPages: number;
  currentPage: number;
}
export interface ProductSliceState {
  product: {
    loading: boolean;
    data: Product | undefined;
    error: SerializedError | null;
  };
  products: Products;
  pagination: Pagination;
}

export const initialState: ProductSliceState = {
  product: {
    loading: false,
    data: undefined,
    error: null,
  },
  products: {
    loading: false,
    data: [],
    error: null,
  },
  pagination: {
    size: 10, // limit
    page: 0,
    count: 0, // totalProducts
    totalPages: 0,
    currentPage: 1,
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setSize: (state, action) => {
      state.pagination.size = action.payload;
    },
    clearProduct: (state) => {
      state.product.data = {} as Product;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.products.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products.loading = false;
      state.products.data = action.payload.data;
      state.pagination.count = action.payload.metadata.totalProducts;
      state.pagination.totalPages = action.payload.metadata.totalPages;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products.loading = false;
      state.products.error = action.error;
    });
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.products.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products.loading = false;
      state.products.data = action.payload.data;
      state.pagination.count = action.payload.data.length;
      state.pagination.totalPages = 1;
      state.pagination.page = 1;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.products.loading = false;
      state.products.error = action.error;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.product.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      const product: Product = {
        _id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        image: action.payload.image,
      };
      state.product.loading = false;
      state.products.loading = false;
      state.product.data = product;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.products.data = [product, ...state.products.data!];
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.product.loading = false;
      state.product.error = action.error;
    });
  },
});

export const { clearProduct, setPage, setSize } = productSlice.actions;

export default productSlice.reducer;
