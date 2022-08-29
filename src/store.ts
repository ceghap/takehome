import { configureStore } from '@reduxjs/toolkit'
import profileReducer, { set } from './private/profile/ProfileSlice'
import productsReducer from './private/products/ProductsSlice'

export const store = configureStore({
  reducer: { profile: profileReducer, product: productsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [set.type],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
