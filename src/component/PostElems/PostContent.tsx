import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchPost } from '../../store/reducers/postSlice'
import { dateConvert } from '../../utils/dateConvert'
import CustomMarkdown from '../Markdown/CustomMarkdown'
import PostSkeleton from '../Skeletons/PostSkeleton'
import PostAuthor from './PostAuthor'
import PostInfo from './PostInfo'

export default function PostContent() {

  const dispatch = useAppDispatch()
  const params = useParams()

  const navigate = useNavigate()

  const post = useAppSelector((state) => state.postReducer.post)
  const isLoading = useAppSelector(state => state.postReducer.isLoading)

  const date = dateConvert(post.createdAt)

  const handleClickCategory = (category: string) => {
    navigate({
      pathname: '/blog',
      search: `?${createSearchParams({ category })}`
    })
  }

  const handleClickTag = (tag: string) => {
    navigate({
      pathname: '/blog',
      search: `?${createSearchParams({ term: tag })}`
    })
  }

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPost(params.id))
    }
  }, [params])

  return (
    <>
      {isLoading ?
        <PostSkeleton />
        :
        <Paper elevation={0} sx={{ backgroundColor: 'white', p: 2, flexGrow: '1', mb: '15px' }}>
          <PostAuthor id={post.author._id} photo={post.author.photo} name={post.author.nickname} date={date} mb="15px" />
          <Typography component={'h1'} variant={"h4"} sx={{ marginBottom: '30px', fontWeight: 600 }}>
            {post.title}
          </Typography>
          {post.img &&
            <Box component={'img'} src={`${process.env.REACT_APP_API_URL}${post.img}`} sx={{
              height: 'auto',
              maxHeight: '460px',
              width: '100%',
              objectFit: 'cover',
              mb: '20px',
            }} />
          }

          <CustomMarkdown text={post.text} />
          <Box display="flex" sx={{ mb: '10px' }}>
            <Typography component="p" variant="body1" sx={{ fontWeight: 800, mr: '8px' }}>Categories:</Typography>
            {post.categories.map((category) =>
              <Typography
                onClick={() => handleClickCategory(category)}
                key={category}
                color="primary.main"
                sx={{ mr: '8px', '&:hover': { cursor: 'pointer' } }}
              >
                {category},
              </Typography>
            )}
          </Box>
          <Box display="flex" sx={{mb: '20px'}}>
            <Typography component="p" variant="body1" sx={{ fontWeight: 800, mr: '8px' }}>Tags:</Typography>
            {post.tags.map((tag) =>
              <Typography
                onClick={() => handleClickTag(tag)}
                key={tag}
                color="primary.main"
                sx={{ mr: '8px', '&:hover': { cursor: 'pointer' } }}>
                {tag},
              </Typography>)}
          </Box>
          <PostInfo viewsCount={post.viewsCount} commentsCount={post.commentsCount}/>
        </Paper>
      }
    </>
  )
}
