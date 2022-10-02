import { Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setRegisterErr, userRegister } from '../../store/reducers/authSlice'
import { axiosErrorHandler } from '../../utils/axiosErrorHandler'
import { isValidEmail } from '../../utils/isValidEmail'


interface IFormInputs {
  nickname: string
  email: string
  password: string
  passwordConfirm: string
}

export default function RegisterForm() {

  const dispatch = useAppDispatch()

  const isAuth = useAppSelector((state) => state.authReducer.isAuth)
  const axiosError = useAppSelector(state => state.authReducer.registerErr)

  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>();

  const [passwordErr, setPasswordErr] = useState('')
  const [validateErrors, setValidateErrors] = useState({emailErr: '', nicknameErr: '', passwordErr: '', formError: ''})

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    const { passwordConfirm, password, ...userData } = data
    if (password !== passwordConfirm) {
      setPasswordErr('Fields do not match')
    } else {
      setPasswordErr('')
      dispatch(userRegister({ ...userData, password }))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setRegisterErr(''))
    }
  }, [])

  useEffect(() => {
    if (isAuth) {
      reset()
      navigate('/')
    }
  }, [isAuth])

  useEffect(() => {
    setValidateErrors(axiosErrorHandler(axiosError))
  }, [axiosError])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {validateErrors.formError && <Typography color="error" sx={{ mb: '15px' }}>{validateErrors.formError}</Typography>}
      <TextField
        error={!!errors.email || !!validateErrors.emailErr}
        helperText={errors.email?.message || validateErrors.emailErr}
        size="small"
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ mb: '30px' }}
        {...register("email",  { 
          required: 'This field is reqiured', 
          validate: (email: string) => isValidEmail(email) || 'You must enter email'  
        })}
      />
      <TextField
        error={!!errors.nickname || !!validateErrors.nicknameErr}
        helperText={errors.nickname?.message || validateErrors.nicknameErr}
        size="small"
        label="Name"
        variant="outlined"
        fullWidth
        sx={{ mb: '30px' }}
        {...register("nickname", { 
          required: 'This field is reqiured', 
          maxLength: {message: 'Max length is 20 symbol', value: 20}
        })}
      />
      <TextField
        error={!!errors.password || !!passwordErr}
        helperText={errors.password?.message || passwordErr}
        type="password"
        size="small"
        label="Password"
        variant="outlined"
        fullWidth
        sx={{ mb: '30px' }}
        {...register("password", { 
          required: 'This field is reqiured', 
          minLength: {message: 'This password is too easy', value: 8} 
        })}
      />
      <TextField
        error={!!errors.passwordConfirm || !!passwordErr}
        helperText={errors.passwordConfirm?.message || passwordErr}
        type="password"
        size="small"
        label="Password confirmation"
        variant="outlined"
        fullWidth
        sx={{ mb: '30px' }}
        {...register("passwordConfirm", { required: 'This field is reqiured' })}
      />
      <Button type="submit" variant="contained" size='large' sx={{ width: '100%', mb: '15px' }}>Register</Button>
    </form>
  )
}
