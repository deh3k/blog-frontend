import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { IAxiosError } from "../../model/IAxiosError";
import { IPost } from "../../model/IPost";
import { IQuery } from "../../model/IQuery";
import { IUser } from "../../model/IUser";
import { isAxiosError } from "../../utils/IsAxiosError";


interface FetchPostResponse {
  posts: IPost[]
  totalCount: number
}


export const deletePost = createAsyncThunk(
  'userPosts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await instance.delete<IPost>(`/post/${id}`)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const fetchUserPosts = createAsyncThunk(
  'userPosts/fetchPosts',
  async (data: { userId: string | undefined, query?: IQuery }, { rejectWithValue }) => {
    try {
      const { userId, query } = data
      const response = await instance.get<IPost[]>(`/post/`, { params: { term: query?.term, sort: query?.sort, page: query?.page, category: query?.category, author: userId } })
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const fetchUser = createAsyncThunk(
  'userPosts/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await instance.get<IPost[]>(`/user/${userId}`)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)


interface UserPostsState {
  user: IUser
  posts: IPost[]
  totalCount: number
  isLoading: boolean
  isDeletePending: boolean
  error: string
}

const initialState: UserPostsState = {
  user: {
    _id: '',
    nickname: '',
    photo: '',
  },
  posts: [],
  totalCount: 0,
  isLoading: false,
  isDeletePending: false,
  error: '',
}

export const userPostsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetUser: (state, action: PayloadAction) => {
      state.user = {
        _id: '',
        nickname: '',
        photo: '',
      }
    }
  },
  extraReducers: {
    [fetchUserPosts.pending.type || fetchUser.pending.type]: (state, action: PayloadAction<IPost>) => {
      state.isLoading = true
    },
    [fetchUserPosts.fulfilled.type]: (state, action: PayloadAction<FetchPostResponse>) => {
      state.posts = action.payload.posts
      state.totalCount = action.payload.totalCount
      state.isLoading = false
      state.error = ''
    },
    [fetchUserPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    [deletePost.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts.filter(post => post._id !== action.payload._id)
      state.isDeletePending = false
    },
    [deletePost.pending.type]: (state, action: PayloadAction) => {
      state.isDeletePending = true
    },
    [deletePost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isDeletePending = false
      state.error = action.payload
    }
  }
})

export const { resetUser } = userPostsSlice.actions

export default userPostsSlice.reducer