import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setError } from '../../store/reducers/errorsSlice';

export default function AlertHandler() {

  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [msgType, setMsgType] = useState<'error' | 'info'>('info')

  const error =  useAppSelector(state => state.errorsReducer.error)
  const isLogout = useAppSelector(state => state.authReducer.isLogout)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if(error || isLogout) {
      setOpen(true)
      if(error) {
        setMessage(error)
        setMsgType('error')
      } else {
        setMessage("You've successfully logout")
        setMsgType('info')
      }
    }

    dispatch(setError(''))
  }, [error, isLogout])


  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} variant="filled" severity={msgType} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
