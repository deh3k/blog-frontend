import { Box, Button, Card, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { createSearchParams, NavLink, useNavigate } from 'react-router-dom'
import { IPost } from '../../model/IPost'
import { cutStr } from '../../utils/cutStr'
import { dateConvert } from '../../utils/dateConvert'
import CustomMarkdown from '../Markdown/CustomMarkdown'
import PostAuthor from '../PostElems/PostAuthor'
import PostBtns from '../PostElems/PostBtns'
import PostInfo from '../PostElems/PostInfo'

interface IProps {
  post: IPost
  isAuthor?: boolean
}

export default function BlogItemList({ post, isAuthor = false }: IProps) {

  const navigate = useNavigate()

  const text = cutStr(post.text)
  const date = dateConvert(post.createdAt)

  const handleClickCategory = (category: string) => {
    navigate({
      pathname: '/blog',
      search: `?${createSearchParams({ category })}`
    })
  }


  return (
    <Card sx={{ mt: 3, p: 3, boxShadow: 0, backgroundColor: 'white' }}>
      <Box display="flex" justifyContent="space-between" alignItems='flex-start'>
        <div>
          <PostAuthor id={post.author._id} photo={post.author.photo} name={post.author.nickname} date={date} mb="12px" />
          <NavLink to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="h5" color="text.primary" component="h6" sx={{ lineHeight: "110%", fontWeight: 500, mb: '8px' }}>
              {post.title}
            </Typography>
          </NavLink>
          <Box display='flex'>  
            {post.categories.map((category) => <Typography
              key={category}
              component='h6'
              onClick={() => handleClickCategory(category)}
              color="text.secondary"
              variant="h6"
              sx={{ fontSize: '14px', mb: 3, mr: '6px', fontWeight: 500, '&:hover': { cursor: 'pointer' } }}>
              {category},
            </Typography>)}
          </Box>
        </div>
        {isAuthor && <PostBtns id={post._id}/>}
      </Box>
      {post.img && <CardMedia
        component="img"
        sx={{ width: '100%', height: 'auto', mr: '20px', mb: '20px' }}
        image={`${process.env.REACT_APP_API_URL}/${post.img}`}
        alt="Live from space album cover"
      />}
      <div>
        <CustomMarkdown text={text} />
      </div>
      <PostInfo viewsCount={post.viewsCount} commentsCount={post.commentsCount}/>
    </Card>
  )
}
