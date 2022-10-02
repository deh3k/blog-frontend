import { Box, Button, Paper, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchComments } from '../../store/reducers/commentSlice'
import CommentItem from './CommentItem'
import Loader from '../Common/Loader';


export default function Comments() {

  const dispatch = useAppDispatch()

  const comments = useAppSelector(state => state.commentReducer.comments)
  const isLoading = useAppSelector(state => state.commentReducer.isLoading)

  const commentsCount = useAppSelector(state => state.postReducer.post.commentsCount)

  const postId = useAppSelector(state => state.postReducer.post._id)

  const handleClickLoad = () => {
    dispatch(fetchComments({postId, limit: commentsCount}))
  }

  useEffect(() => {
    if(postId) {
      dispatch(fetchComments({postId}))
    }
  }, [postId])


  return (
    <Paper elevation={0} sx={{backgroundColor: 'white', p: '20px'}}>
      <Typography variant="body1" color="text.primary" sx={{fontWeight: 500, mb: '15px'}}>Comments: {commentsCount}</Typography>
      {comments.map((comment) => <CommentItem key={comment._id} comment={comment}/>)}
      {commentsCount > 20 && !(comments.length >= commentsCount) && !isLoading && <Box display="flex" justifyContent="center">
          <Button onClick={() => handleClickLoad()} color="primary" size="small">
            Load more 
            <RefreshIcon color="primary"/>
          </Button>
        </Box>}
      {isLoading && <Loader/>}
    </Paper>
  )
}
