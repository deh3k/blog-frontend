  import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../api/api";
import { AuthResponse } from "../../model/IAuthResponse";
import { IAxiosError } from "../../model/IAxiosError";
import { IUser } from "../../model/IUser";
import { isAxiosError } from "../../utils/IsAxiosError";


interface LoginData {
  email: string
  password: string
}

interface RegisterData {
  email: string
  nickname: string
  password: string
}

export const authMe = createAsyncThunk(
  'auth/authMe',
  async (_, thunkAPI) => {
    try {
      let token = localStorage.getItem('token')
      if(token === null) {
        token = ''
      }
      const response = await axios.get<IUser>(`${process.env.REACT_APP_API_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data

    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        localStorage.removeItem('token')
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }     
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData, thunkAPI) => {
    try {
      const response = await instance.post<AuthResponse>('/login', data)
      await localStorage.setItem('token', response.data.accessToken)
      thunkAPI.dispatch(authMe())
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }    
    }
  }
)

export const userRegister = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, thunkAPI) => {
    try {
      const response = await instance.post<AuthResponse>('/register', data)
      localStorage.setItem('token', response.data.accessToken)
      thunkAPI.dispatch(authMe())
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message)
      }
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout', 
  async (_, thunkAPI) => {
    try {
      // await instance.delete('/login')
      localStorage.removeItem('token')
    } catch (error) {
      if (isAxiosError<IAxiosError>(error)) {
        return thunkAPI.rejectWithValue(error.response?.data)
      }
    }
  }
)

interface AuthState {
  isAuth: boolean
  loginErr: string
  registerErr: string
  isLogout: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  isAuth: false,
  loginErr: '',
  registerErr: '',
  isLogout: false,
  isLoading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = false
    },
    setLoginErr: (state, action: PayloadAction<string>) => {
      state.loginErr = action.payload
    },
    setRegisterErr: (state, action: PayloadAction<string>) => {
      state.registerErr = action.payload
    },
  },
  extraReducers: {
    [authMe.pending.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = true
    },
    [authMe.rejected.type]: (state, action: PayloadAction<any>) => {
      state.isAuth = false
      state.isLoading = false
    },
    [authMe.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
      state.isAuth = true
      state.isLoading = false
      state.isLogout = false
    },
    [logout.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isAuth = false
      state.isLogout = true
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loginErr = action.payload
    },
    [login.pending.type]: (state, action: PayloadAction<string>) => {
      state.loginErr = ''
    },   
    [login.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.loginErr = ''
    },
    [userRegister.rejected.type]: (state, action: PayloadAction<string>) => {
      state.registerErr = action.payload
    },   
    [userRegister.pending.type]: (state, action: PayloadAction<string>) => {
      state.registerErr = ''
    },    
    [userRegister.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.registerErr = ''
    },
  }
})

export const { setIsAppLoading, setLoginErr, setRegisterErr } = authSlice.actions

export default authSlice.reducer