import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { IAxiosError } from "../../model/IAxiosError";
import { IPost, IPostData, IUpdatePostData } from "../../model/IPost";
import { isAxiosError } from "../../utils/IsAxiosError";


export const uploadFile = createAsyncThunk(
  'postForm/upload-file',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await instance.post<{ url: string }>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data.url
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const deleteFile = createAsyncThunk(
  'postForm/delete-file',
  async (preview: string, { rejectWithValue }) => {
    try {
      await instance.delete(`/deleteFile/${preview}`)
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const createPost = createAsyncThunk(
  'postForm/create',
  async (data: IPostData, { rejectWithValue }) => {
    try {
      const response = await instance.post<string>('/post', data)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const fetchPostToUpdate = createAsyncThunk(
  'postForm/fetchPost',
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await instance.get<IPost>(`/post/${postId}`)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const updatePost = createAsyncThunk(
  'postForm/updatePost',
  async (data: IUpdatePostData, { rejectWithValue }) => {
    try { 
      const {postId, ...postData} = data
      const response = await instance.put<IPost>(`/post/${postId}`, postData)
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

interface PostState {
  postId: string
  submitType: 'create' | 'update'
  postToUpdate: IPost
  isFetching: boolean
  postPreview: string
  error: string
  isFinish: boolean
}

const initialState: PostState = {
  postId: '',
  submitType: 'create',
  postToUpdate: {
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
  isFetching: false,
  postPreview: '',
  error: '',
  isFinish: false,
}

export const postFormSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setIsFinish: (state, action: PayloadAction<boolean>) => {
      state.isFinish = action.payload
    },
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    setPreview: (state, action: PayloadAction<string>) => {
      state.postPreview = action.payload
    },
    setDefaultValues: (state, action: PayloadAction) => {
      state.postId = ''
      state.submitType = 'create'
      state.postToUpdate = {
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
      }
      state.postPreview = ''
      state.error = ''
    },
    setSubmitType: (state, action: PayloadAction<'create' | 'update'>) => {
      state.submitType = action.payload
    },
  },
  extraReducers: {
    [uploadFile.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.postPreview = action.payload
      state.error = ''
    },
    [createPost.rejected.type]: (state, action: PayloadAction<{ message: string }>) => {
      state.error = action.payload.message
    },
    [createPost.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
      state.isFinish = true
    },
    [fetchPostToUpdate.fulfilled.type]: (state, action: PayloadAction<IPost>) => {
      state.postToUpdate = action.payload
      state.isFetching = false
    },
    [fetchPostToUpdate.pending.type]: (state, action: PayloadAction) => {
      state.isFetching = true
    },
    [fetchPostToUpdate.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isFetching = false
      state.error = action.payload
    },
    [updatePost.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isFinish = true
    },   
    [updatePost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  }
})


export const { setIsFinish, setPostId, setPreview, setDefaultValues, setSubmitType } = postFormSlice.actions

export default postFormSlice.reducer