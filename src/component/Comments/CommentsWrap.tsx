import { Box } from '@mui/material'
import React from 'react'
import Comments from './Comments'
import CommentsForm from './CommentsForm'

export default function CommentsWrap() {
  return (
    <Box>
      <CommentsForm />
      <Comments />
    </Box>
  )
}
