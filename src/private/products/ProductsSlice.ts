import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (query: { limit: number; page: number }) => {
    const response = await axios.get(
      `https://api.storerestapi.com/products?limit=${query.limit}&page=${query.page}`,
    );

    return response.data.data;
  },
);

export const createProduct = createAsyncThunk('product/create', async (values: Product) => {
  const body: Product = {
    title: values.title,
    description: values.description,
    price: Number(values.price),
    image: 'https://via.placeholder.com/600x400',
  };

  const response = await axios.post<Product>('https://api.storerestapi.com/products', body, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  return response.data;
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
  limit: number;
  page: number;
  totalProducts: number | undefined;
  nextPage: number;
  totalPages: number | undefined;
  error: SerializedError | null;
}

export interface ProductSliceState {
  product: {
    loading: boolean;
    data: Product | undefined;
    error: SerializedError | null;
  };
  products: Products;
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
    limit: 10,
    page: 1,
    totalProducts: undefined,
    nextPage: 2,
    totalPages: undefined,
    error: null,
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
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
      state.products.page = action.payload.currentPage;
      state.products.totalProducts = action.payload.totalProducts;
      state.products.nextPage = action.payload.nextPage;
      state.products.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.products.loading = false;
      state.products.error = action.error;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.product.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.product.loading = false;
      state.products.loading = false;
      state.product.data = {
        title: action.payload.title,
        description: action.payload.description,
        price: action.payload.price,
        image: action.payload.image,
      };
      // state.products.data = state.products.data?.unshift()
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.product.loading = false;
      state.product.error = action.error;
    });
  },
});

export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;
