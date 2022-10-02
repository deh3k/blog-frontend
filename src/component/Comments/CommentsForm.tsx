import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createComment, setCommentToUpd, setIsCommentCreated, updateComment } from '../../store/reducers/commentSlice';

interface IFormInputs {
  comment: string
}


export default function CommentsForm() {

  const dispatch = useAppDispatch()

  const isCreating = useAppSelector(state => state.commentReducer.isCreating)
  const isCreated = useAppSelector(state => state.commentReducer.isCreated)
  const commentToUpd = useAppSelector(state => state.commentReducer.commentToUpd)

  const postId = useAppSelector(state => state.postReducer.post._id)

  const { register, handleSubmit, setValue, reset, setFocus } = useForm<IFormInputs>({
    defaultValues: {
      comment: ''
    }
  });

  const onSubmit: SubmitHandler<IFormInputs> = data => {
    if(commentToUpd.id) {
      dispatch(updateComment({id: commentToUpd.id, text: data.comment, postId}))
    } else {
      dispatch(createComment({postId, text: data.comment}))
    }
  }

  useEffect(() => {
    return (() => {
      reset()
      dispatch(setCommentToUpd({id: '', text: ''}))
    })
  }, [])

  useEffect(() => {
    if(isCreated) {
      reset()
      dispatch(setIsCommentCreated(false))
      dispatch(setCommentToUpd({id: '', text: ''}))
    }
  }, [isCreated])

  useEffect(() => {
    if(commentToUpd.text) {
      setValue('comment', commentToUpd.text)
      setFocus("comment", { shouldSelect: false })
    }
  }, [commentToUpd.text])

  return (
    <Paper elevation={0} sx={{backgroundColor: 'white', p: '15px 20px 0'}}>
      <form onSubmit={handleSubmit(onSubmit)}>
      {commentToUpd.text && 
        <Typography 
          variant="subtitle2" 
          color="white" 
          sx={{display: 'inline', p: '4px', backgroundColor: 'primary.main', borderRadius: '4px 4px 0 0'}}
        >
          Comment Edit
        </Typography>
      }
        <Box sx={{display: 'flex'}}>
          <TextField 
            variant='outlined' 
            size="small" 
            fullWidth 
            placeholder="Enter comment text"
            sx={{mr: '12px'}}
            {...register('comment', {required: true})}
          />
          <Button disabled={isCreating} type="submit" variant="contained" size="medium" color="primary" sx={{width: '100px'}}>Send</Button>
        </Box>
      </form>
    </Paper>
  )
}
