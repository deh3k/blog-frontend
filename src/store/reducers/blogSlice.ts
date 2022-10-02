import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { IAxiosError } from "../../model/IAxiosError";
import { IFetchPostResponse } from "../../model/IFetchPostResponse";
import { IPost } from "../../model/IPost";
import { IQuery } from "../../model/IQuery";
import { isAxiosError } from "../../utils/IsAxiosError";


export const fetchPosts = createAsyncThunk(
  'blog/fetchAll',
  async (query: IQuery | undefined, { rejectWithValue }) => {
    try { 
      const response = await instance.get<IPost[]>('/post',
        {
          params: { term: query?.term, sort: query?.sort, page: query?.page, category: query?.category }
        })
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)


interface BlogState {
  posts: IPost[]
  totalCount: number
  isLoading: boolean
  error: string
}

const initialState: BlogState = {
  posts: [],
  totalCount: 0,
  isLoading: false,
  error: '',
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchPosts.pending.type]: (state, action: PayloadAction<IPost>) => {
      state.isLoading = true
    },
    [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IFetchPostResponse>) => {
      state.posts = action.payload.posts
      state.totalCount = action.payload.totalCount
      state.isLoading = false
      state.error = ''
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})


export default blogSlice.reducer