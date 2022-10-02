import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { IAxiosError } from "../../model/IAxiosError";
import { IPost } from "../../model/IPost";
import { isAxiosError } from "../../utils/IsAxiosError";

export const fetchPost = createAsyncThunk(
  'post/fetchOne',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await instance.get<IPost>(`/post/${id}`)
      return response.data    
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

interface PostState {
  post: IPost
  isLoading: boolean
  error: string
}

const initialState: PostState = {
  post: {
    _id: '',
    title: '',
    img: '',
    tags: [],
    text: '',
    categories: [],
    createdAt: '',
    viewsCount: 0,
    commentsCount: 0,
    author: {
      _id: '',
      nickname: '',
      photo: '',  
    }
  },
  isLoading: false,
  error: '',
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchPost.pending.type]: (state, action: PayloadAction) => {
      state.isLoading = true
    },
    [fetchPost.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
      state.isLoading = false
      state.error = ''
      state.post = action.payload
    },
    [fetchPost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  }
})

export default postSlice.reducer