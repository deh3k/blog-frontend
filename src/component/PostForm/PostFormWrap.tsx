import { Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchPostToUpdate, setDefaultValues, setPostId } from '../../store/reducers/postFormSlice'
import { fetchPost } from '../../store/reducers/postSlice'
import DialogLoader from '../Common/DialogLoader'
import ChangePreview from './ChangePreview'
import PostForm from './PostForm'

export default function PostFormWrap() {

  const dispatch = useAppDispatch()

  const error = useAppSelector((state) => state.postFormReducer.error)
  const postId = useAppSelector(state => state.postFormReducer.postId)
  const postToUpdate = useAppSelector(state => state.postFormReducer.postToUpdate)
  const isFetching = useAppSelector(state => state.postFormReducer.isFetching)

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostToUpdate(postId))
    }
    return (() => {
      dispatch(setDefaultValues())
    })
  }, [])

  return (
    <Paper elevation={0} sx={{ padding: '30px', flexGrow: '1', alignSelf: 'flex-start'}}>
      {isFetching
        ?
        <DialogLoader open={isFetching} />
        :
        <>
          {error && <Typography gutterBottom color='error'>{error}</Typography>}
          <ChangePreview preview={postToUpdate.img} />
          <PostForm title={postToUpdate.title} categories={postToUpdate.categories} text={postToUpdate.text} tags={postToUpdate.tags}/>
        </>
      }


    </Paper>
  )
}
