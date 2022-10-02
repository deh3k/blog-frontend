import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import { fetchPost } from "./postSlice";
import { fetchPosts } from "./blogSlice";
import { fetchSidebarPosts } from "./sidebarSlice";
import { deletePost, fetchUserPosts } from "./userPostsSlice";
import { updateAvatar } from "./userSlice";
import { createComment, deleteComment, fetchComments, updateComment } from "./commentSlice";
import { uploadFile } from "./postFormSlice";


interface errorState {
  error: string
}

const initialState: errorState = {
  error: '',
}

export const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
  extraReducers: {
    [logout.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchPost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchSidebarPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchUserPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [deletePost.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [updateAvatar.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [fetchComments.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [createComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [deleteComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [updateComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    [uploadFile.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  }
})

export const { setError } = errorsSlice.actions

export default errorsSlice.reducer