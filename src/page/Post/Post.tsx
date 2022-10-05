import { Box, Container } from '@mui/material'
import React from 'react'
import './Post.scss'
import Sidebar from '../../component/Sidebar/Sidebar';
import PostContent from '../../component/PostElems/PostContent';
import CommentsWrap from '../../component/Comments/CommentsWrap';

export default function Post() {

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'stretch', p: 0 }}>
      <Box sx={{flexGrow: 1}}>
        <PostContent />
        <CommentsWrap />
      </Box>
      <Sidebar />
    </Container>
  )
}










