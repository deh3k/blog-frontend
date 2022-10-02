import { Typography } from '@mui/material'
import React from 'react'
import { IPost } from '../../model/IPost'
import BlogItemList from '../BlogItem/BlogItemList'
import BlogSkeleton from '../Skeletons/BlogSkeleton'

interface IProps {
  posts: IPost[]
  isLoading: boolean
  isAuthor?: boolean
}

export default function BlogList({posts, isLoading, isAuthor}: IProps) {
  return (
    <div>
      {posts.length === 0 && !isLoading &&
        <Typography textAlign='center' component="p" variant="h6" color="text.primary" sx={{ p: '50px', backgroundColor: 'white', mt: '10px' }}>
          Nothing was found
        </Typography>
      }
      {isLoading ?
        [1, 2, 3, 4, 5].map((k) => <BlogSkeleton key={k}/>)
        :
        posts.map((post) => (
          <BlogItemList key={post._id} post={post} isAuthor={isAuthor}/>
        ))
      }
    </div>
  )
}
