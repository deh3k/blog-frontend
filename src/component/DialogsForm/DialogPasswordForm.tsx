import { TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUpdateIsFinished, setUserError, updateUser } from '../../store/reducers/userSlice';
import { axiosErrorHandler } from '../../utils/axiosErrorHandler';


interface IFormInputs {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

interface IProps {
  closeHandler: () => void
}

export default function DialogForm(props: IProps) {

  const dispatch = useAppDispatch()

  const { register, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>();

  const axiosError = useAppSelector((state) => state.userReducer.error)
  const isFinished = useAppSelector((state) => state.userReducer.isFinished)

  const [validateErrors, setValidateErrors] = useState({emailErr: '', nicknameErr: '', passwordErr: '', formError: ''})
  const [passwordErr, setPasswordErr] = useState('')

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { newPasswordConfirm, newPassword, password } = data
    if (newPassword !== newPasswordConfirm) {
      setPasswordErr('Fields do not match')
    } else {
      setPasswordErr('')
      dispatch(updateUser({ password, newPassword }))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setUserError(''))
      dispatch(setUpdateIsFinished(false))
    }
  }, [])

  useEffect(() => {
    if(isFinished) {
      props.closeHandler()
    }
  }, [isFinished])

  useEffect(() => {
    setValidateErrors(axiosErrorHandler(axiosError))
  }, [axiosError])

  return (
    <form id="dialog-pass" onSubmit={handleSubmit(onSubmit)}>
      {validateErrors.formError && <Typography color="error" sx={{mb: '15px'}}>{validateErrors.formError}</Typography>}
      <TextField
        error={!!errors.password || !!validateErrors.passwordErr}
        helperText={errors.password?.message || validateErrors.passwordErr}
        size="small"
        label="Password"
        variant="outlined"
        fullWidth sx={{ mb: '20px' }}
        type="password"
        {...register("password", { required: 'This field is required' })}
      />
      <TextField
        error={!!errors.newPassword || !!passwordErr}
        helperText={errors.newPassword?.message || passwordErr}
        size="small"
        label="New Password"
        variant="outlined"
        fullWidth sx={{ mb: '20px' }}
        type="password"
        {...register("newPassword", { 
          required: 'This field is required', 
          minLength: {value: 8, message: 'This password is too easy'} 
        })}
      />
      <TextField
        error={!!errors.newPasswordConfirm || !!passwordErr}
        helperText={errors.newPasswordConfirm?.message || passwordErr}
        size="small"
        label="New Password Confirmation"
        variant="outlined"
        fullWidth sx={{ mb: '20px' }}
        type="password"
        {...register("newPasswordConfirm", { required: 'This field is required' })}
      />
    </form>
  )
}
