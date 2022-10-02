import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { IAxiosError } from "../../model/IAxiosError";
import { IFetchPostResponse } from "../../model/IFetchPostResponse";
import { IPost } from "../../model/IPost";
import { isAxiosError } from "../../utils/IsAxiosError";


export const fetchSidebarPosts = createAsyncThunk(
  'sidebar/fetchPosts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await instance.get<IPost[]>(`/post?limit=5&sort=views`)
      return response.data    
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

interface SidebarState {
  posts: IPost[]
  isLoading: boolean
}

const initialState: SidebarState = {
  posts: [],
  isLoading: false
}

export const sidbarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchSidebarPosts.fulfilled.type]: (state, action: PayloadAction<IFetchPostResponse>) => {
      state.posts = action.payload.posts
      state.isLoading = false
    },
    [fetchSidebarPosts.pending.type]: (state, action: PayloadAction) => {
      state.isLoading = true
    },
  }
})

export default sidbarSlice.reducer