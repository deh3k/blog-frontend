import { TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { isValidEmail } from '../../utils/isValidEmail';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setUpdateIsFinished, setUserError, updateUser } from '../../store/reducers/userSlice';
import { axiosErrorHandler } from '../../utils/axiosErrorHandler';


interface IFormInputs {
  email?: string
  password: string
  nickname?: string
}

interface IValidateErrors {
  emailErr: string
  nicknameErr: string
  passwordErr: string
  formError: string
}

interface IProps {
  target: string
  closeHandler: () => void
}

export default function DialogForm(props: IProps) {

  const dispatch = useAppDispatch()

  const { register, formState: { errors }, handleSubmit, reset } = useForm<IFormInputs>();

  const axiosError = useAppSelector((state) => state.userReducer.error)
  const isFinished = useAppSelector((state) => state.userReducer.isFinished)
  const [validateErrors, setValidateErrors] = useState<IValidateErrors>({emailErr: '', nicknameErr: '', passwordErr: '', formError: ''})

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(updateUser(data))
  }

  useEffect(() => {
    return () => {
      dispatch(setUserError(''))
      dispatch(setUpdateIsFinished(false))
    }
  }, [])

  useEffect(() => {
    setValidateErrors(axiosErrorHandler(axiosError))
  }, [axiosError])

  useEffect(() => {
    if(isFinished) {
      props.closeHandler()
    }
  }, [isFinished])

  return (
    <form id="dialog-form" onSubmit={handleSubmit(onSubmit)}>
      {validateErrors.formError && <Typography color="error" sx={{mb: '15px'}}>{validateErrors.formError}</Typography>}
      {props.target === 'Email'
        ?
        <TextField
          error={!!errors.email || !!validateErrors.emailErr}
          helperText={errors.email?.message || validateErrors.emailErr}
          size="small"
          label="Email"
          variant="outlined"
          fullWidth sx={{ mb: '20px' }}
          {...register("email", { 
            required: 'This field is required', 
            validate: (email: string | undefined) => email && isValidEmail(email) || 'You must enter email'
          })}
        />
        :
        <TextField
          error={!!errors.nickname || !!validateErrors.nicknameErr}
          helperText={errors.nickname?.message || validateErrors.nicknameErr}
          size="small"
          label="Nickname"
          variant="outlined"
          fullWidth sx={{ mb: '20px' }}
          {...register("nickname", { 
            required: 'This field is required', 
            minLength: {value: 3, message: 'Min length is 3 symbol'} 
          })}
        />
      }
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
    </form>
  )
}
