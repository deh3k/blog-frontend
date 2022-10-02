import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchSidebarPosts } from '../../store/reducers/sidebarSlice'
import SmallPostSkeleton from '../Skeletons/SmallPostSkeleton'
import SmallPost from './SmallPost'

export default function TrendingPosts() {
  
  const dispatch = useAppDispatch()

  const posts = useAppSelector(state => state.sidebarReducer.posts)
  const isLoading = useAppSelector(state => state.sidebarReducer.isLoading)

  useEffect(() => {
    dispatch(fetchSidebarPosts())
  }, [])


  return (
    <Box sx={{ mb: '20px', backgroundColor: 'white', p: 2, }}>
      <Typography component="h6" variant="h5" sx={{ fontSize: '20px', fontWeight: '500', mb: '24px' }}>
        Trending Post
      </Typography>
      {isLoading ?
        [1, 2, 3, 4, 5].map((k) => <SmallPostSkeleton key={k} />)
        :
        posts.map((post) => (
          <SmallPost key={post._id} title={post.title} date={post.createdAt} img={post.img} id={post._id} />
        ))
      }
    </Box>
  )
}
