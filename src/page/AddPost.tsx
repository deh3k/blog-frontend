import { Container } from '@mui/material'
import React, { useState } from 'react'
import PostFormWrap from '../component/PostForm/PostFormWrap';
import Sidebar from '../component/Sidebar/Sidebar';
import { useCheckAuth } from '../hooks/useCheckAuth';


export default function AddPost() {

  useCheckAuth()

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'strech', p: 0 }}>
      <PostFormWrap />
      <Sidebar />
    </Container>
  )
}
