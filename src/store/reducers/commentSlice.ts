import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { instance } from "../../api/api";
import { IAxiosError } from "../../model/IAxiosError";
import { IActionComment, IComment, ICommentToUpd } from "../../model/IComment";
import { isAxiosError } from "../../utils/IsAxiosError";


export const fetchComments = createAsyncThunk(
  'comment/fetchAll',
  async (data: {postId: string, limit?: number | null}, {rejectWithValue}) => {
    try {
      const response = await instance.get<IComment[]>(`/comment/${data.postId}`,
      {
        params: { limit: data.limit}
      })
      return response.data
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const createComment = createAsyncThunk(
  'comment/create',
  async ({postId, text}: {postId: string, text: string}, {rejectWithValue}) => {
    try {
      const response = await instance.post<IComment>(`/comment`, {postId, text})
      return response.data    
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comment/delete',
  async (commnetId: string, {rejectWithValue}) => {
    try {
      const response = await instance.delete<IComment>(`/comment/${commnetId}`)
      return response.data    
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const updateComment = createAsyncThunk(
  'comment/update',
  async (data: IActionComment, thunkAPI) => {
    try {
      const response = await instance.put<IComment>(`/comment/${data.id}`, {text: data.text})
      thunkAPI.dispatch(fetchComments({postId: data.postId}))
      return response.data    
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }
    }
  }
)

interface commentState {
  comments: IComment[]
  commentToUpd: ICommentToUpd
  error: string
  isLoading: boolean
  isCreated: boolean
  isCreating: boolean
}

const initialState: commentState = {
  comments: [],
  commentToUpd: {
    text: '',
    id: '',
  },
  error: '',
  isLoading: false,
  isCreated: false,
  isCreating: false,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setIsCommentCreated: (state, action: PayloadAction<boolean>) => {
      state.isCreated = action.payload
    },
    setCommentToUpd: (state, action: PayloadAction<ICommentToUpd>) => {
      state.commentToUpd = action.payload
    }
  },
  extraReducers: {
    [fetchComments.fulfilled.type]: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload
      state.isLoading = false
    },    
    [fetchComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [fetchComments.pending.type]: (state, action: PayloadAction<IComment[]>) => {
      state.isLoading = true
    },
    [deleteComment.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
      state.comments = state.comments.filter(comment => comment._id !== action.payload._id)
    },
    [createComment.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
      state.comments.unshift(action.payload)
      state.isCreated = true
      state.isCreating = false
    },   
    [createComment.pending.type]: (state, action: PayloadAction) => {
      state.isCreating = true
    },
    [createComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isCreating = false
      state.error = action.payload
    },
    [updateComment.fulfilled.type]: (state, action: PayloadAction<IComment>) => {
      state.isCreated = true
      state.isCreating = false
    },   
    [updateComment.pending.type]: (state, action: PayloadAction) => {
      state.isCreating = true
    },
    [updateComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isCreating = false
      state.error = action.payload
    },

  }
})

export const { setIsCommentCreated, setCommentToUpd } = commentSlice.actions

export default commentSlice.reducer