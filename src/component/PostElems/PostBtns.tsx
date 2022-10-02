import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux'
import { setPostId, setSubmitType } from '../../store/reducers/postFormSlice'
import { PostDeleteBtn } from './PostDeleteBtn'

interface IProps {
  id: string
}

export default function PostBtns(props: IProps) {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const updateHandler = () => {
    dispatch(setPostId(props.id))
    dispatch(setSubmitType('update'))
    navigate('/add-post')
  }

  return (
    <Box display="flex" sx={{flexDirection: {sm: 'row', xs: 'column'}}}>
      <Button variant="contained" color="secondary" onClick={updateHandler} sx={{ m: {sm: '0 15px', xs: '0 0 8px'} }}>
        Update
      </Button>
      <PostDeleteBtn id={props.id}/>
    </Box>
  )
}
