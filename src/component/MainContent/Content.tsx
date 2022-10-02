import { Alert, Box, Snackbar } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../Header/Header'
import Home from '../../page/Home/Home';
import About from '../../page/About';
import Post from '../../page/Post/Post';
import Blog from '../../page/Blog';
import { useAppSelector } from '../../hooks/redux';


const Login = React.lazy(() => import('../../page/Auth/Login'))
const Register = React.lazy(() => import('../../page/Auth/Register'))
const AddPost = React.lazy(() => import('../../page/AddPost'))
const UserPosts = React.lazy(() => import('../../page/UserPosts'))
const Account = React.lazy(() => import('../../page/Account/Account'))


export default function Content() {

  return (
    <>
      <Header color="black" />
      <Box sx={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/posts/:userId" element={<Suspense><UserPosts /></Suspense>} />
          <Route path="/account" element={<Suspense><Account /></Suspense>} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/add-post" element={<Suspense><AddPost /></Suspense>} />
          <Route path="/login" element={<Suspense><Login /></Suspense>} />
          <Route path="/register" element={<Suspense><Register /></Suspense>} />
        </Routes>
      </Box>
    </>
  )
}
