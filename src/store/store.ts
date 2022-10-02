import { combineReducers, configureStore } from "@reduxjs/toolkit";
import blogReducer from './reducers/blogSlice';
import postReducer from './reducers/postSlice';
import postFormReducer from './reducers/postFormSlice';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice';
import userPostsReducer from "./reducers/userPostsSlice";
import sidebarReducer from './reducers/sidebarSlice';
import commentReducer from "./reducers/commentSlice";
import errorsReducer from "./reducers/errorsSlice";

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  userPostsReducer,
  postReducer,
  blogReducer,
  postFormReducer,
  sidebarReducer,
  commentReducer,
  errorsReducer,
})


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']