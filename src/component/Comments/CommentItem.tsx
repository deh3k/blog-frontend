import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { IComment } from '../../model/IComment'
import PostAuthor from '../PostElems/PostAuthor'
import EditIcon from '@mui/icons-material/Edit';
import { deleteComment, setCommentToUpd } from '../../store/reducers/commentSlice'
import { CommentDeleteBtn } from './CommentDeleteBtn'
import { dateTimeConvert } from '../../utils/dateConvert'
import { Link } from 'react-router-dom'

interface IProps {
  comment: IComment
}

export default function CommentItem({ comment }: IProps) {

  const date = dateTimeConvert(comment.createdAt)

  const dispatch = useAppDispatch()

  const userId = useAppSelector(state => state.userReducer.user._id)

  const [isAuthor, setIsAuthor] = useState(false)

  const handleClickUpdate = () => {
    dispatch(setCommentToUpd({ text: comment.text, id: comment._id }))
  }

  useEffect(() => {
    if (userId === comment.author._id) {
      setIsAuthor(true)
    }
  }, [userId])

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}>
        <div>
          <PostAuthor id={comment.author._id} photo={comment.author.photo} name={comment.author.nickname} date={date} mb="8px" />
          <Typography variant="body1" color="text.primary">
            {comment.text}
          </Typography>
        </div>
        {isAuthor &&
          <Box display="flex">
            <EditIcon onClick={() => handleClickUpdate()} sx={{ width: '20px', color: 'primary.main', mr: '12px', '&:hover': { cursor: 'pointer' } }} />
            <CommentDeleteBtn id={comment._id} />
          </Box>
        }
      </Box>
    </>
  )
}
