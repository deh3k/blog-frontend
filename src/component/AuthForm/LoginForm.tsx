import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login, setLoginErr } from '../../store/reducers/authSlice';
import { isValidEmail } from '../../utils/isValidEmail';

interface IFormInputs {
  email: string
  password: string
}

export default function LoginForm() {

  const dispatch = useAppDispatch()

  const isAuth = useAppSelector((state) => state.authReducer.isAuth)
  const axiosError = useAppSelector((state) => state.authReducer.loginErr)

  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    dispatch(login(data))
  }

  useEffect(() => {
    return () => {
      dispatch(setLoginErr(''))
    }
  }, [])

  useEffect(() => {
    if(isAuth) {
      reset()
      navigate('/')
    }
  }, [isAuth])
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {axiosError && <Typography color="error" sx={{mb: '15px'}}>{axiosError}</Typography>}
      <TextField 
        error={!!errors.email || !!axiosError}
        helperText={errors.email?.message}
        size="small" 
        label="Email" 
        variant="outlined" 
        fullWidth sx={{ mb: '30px' }} 
        {...register("email", { 
          required: 'This field is required', 
          validate: (email:string) => isValidEmail(email) || 'You must enter email' 
        })}
      />

      <TextField 
        error={!!errors.password || !!axiosError}
        helperText={errors.password?.message}
        size="small" 
        label="Password" 
        variant="outlined" 
        fullWidth sx={{ mb: '30px' }} 
        type="password"
        {...register("password", { required: 'This field is required'})}
      />

      <Button type="submit" variant="contained" size='large' sx={{ width: '100%', mb: '15px' }}>Login</Button>
    </form>
  )
}
