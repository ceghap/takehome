import { createSlice, createAsyncThunk, SerializedError, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProfile = createAsyncThunk('profile/fetch', async (id: number) => {
  const response = await axios.get('/user.json')
  const result = response.data.find((d: Profile) => d.id === id)
  return result
})

export interface Profile {
  id?: number | undefined
  email: string
  password: string
  confirmPassword?: string
  code?: number | undefined
  active: boolean
  name: string
  username: string
  address: string
  country: string
  city: string
  postcode: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photoId?: File | undefined | string
}

interface ProfileSliceState {
  profile: {
    loading: boolean
    data: Profile
    error: SerializedError | null
    success: boolean
  }
}

export const initialState: ProfileSliceState = {
  profile: {
    loading: false,
    data: {} as Profile,
    error: null,
    success: false,
  },
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Profile>) => {
      state.profile.data = action.payload
    },
    reset: (state) => {
      state.profile.data = {} as Profile
    },
    update: (state, action: PayloadAction<Profile>) => {
      state.profile.data = action.payload
      state.profile.success = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.profile.loading = true
    })
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile.data = action.payload
      state.profile.loading = false
    })
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.profile.loading = false
      state.profile.error = action.error
    })
  },
})

// Action creators are generated for each case reducer function
export const { set, reset, update } = profileSlice.actions

export default profileSlice.reducer
