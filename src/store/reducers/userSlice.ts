import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { AuthResponse } from "../../model/IAuthResponse";
import { IAxiosError } from "../../model/IAxiosError";
import { IAuthUser } from "../../model/IUser";
import { isAxiosError } from "../../utils/IsAxiosError";
import { authMe, logout } from "./authSlice";

interface updateData {
  email?: string
  nickname?: string
  password: string
  newPassword?: string
}

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: updateData, thunkAPI) => {
    try {
      const response = await instance.put<IAuthUser>('/user', data)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await instance.put<{url: string}>('/user/ava', formData)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

interface userState {
  user: IAuthUser
  error: string
  isFinished: boolean
}

const initialState: userState = {
  user: {
    _id: '',
    email: '',
    nickname: '',
    photo: '',
  },
  error: '',
  isFinished: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setUpdateIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload
    }
  },
  extraReducers: {
    [authMe.fulfilled.type]: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload
    },
    [logout.fulfilled.type]: (state, action: PayloadAction) => {
      state.user = {_id: '', email: '', nickname: '', photo: ''}
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [updateUser.pending.type]: (state, action: PayloadAction<any>) => {
      state.error = ''
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload
      state.isFinished = true
    },
    [updateAvatar.fulfilled.type]: (state, action: PayloadAction<{url: string}>) => {
      state.user.photo = action.payload.url
    }
  }
})

export const { setUserError, setUpdateIsFinished } = userSlice.actions

export default userSlice.reducer