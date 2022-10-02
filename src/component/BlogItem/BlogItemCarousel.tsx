import { Avatar, Box, Card, CardMedia, CardContent, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IPost } from '../../model/IPost'
import { cutStr } from '../../utils/cutStr'
import { dateConvert } from '../../utils/dateConvert'
import PostAuthor from '../PostElems/PostAuthor'
import './BlogItem.scss'

interface IProps {
  post: IPost
}

export default function BlogItemCarousel({post}: IProps) {

  const postText = cutStr(post.text, 1)
  const date = dateConvert(post.createdAt)


  return (
    <Card sx={{
      display: {md: 'flex', sm: 'block'},
      maxWidth: {md: 'none', sm: '600px'},
      margin: {md: '0', sm: '0 auto'},
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0',
      backgroundColor: 'rgba(244,245,247, 1)'
    }}>
      {post.img && <CardMedia
          component="img"
          sx={{ 
            width: {md: '440px', sm: '100%'}, 
            height: {md: '385px', sm: 'auto'}, 
            mr: '20px' 
          }}
          image={`${process.env.REACT_APP_API_URL}${post.img}`}
        />
      }
      
      <div>
        <CardContent>
          <Typography gutterBottom component='h6' variant="h6" sx={{ fontSize: '14px' }}>Bussines, Travel</Typography>
          <NavLink to={`/post/${post._id}`} style={{textDecoration: 'none'}}>
            <Typography gutterBottom component="h6" color="text.primary" sx={{
              typography: { md: 'h3', xs: 'h5' }, 
              lineHeight: { md: '110%' }, 
              fontWeight: { md: 500, xs: 500}}
            }>
              {post.title}
            </Typography>
          </NavLink>
          <Typography variant="body2" color="text.secondary" className="blog__text" sx={{mb: '12px'}}>
            {postText}
          </Typography>
          <PostAuthor id={post.author._id} photo={post.author.photo} name={post.author.nickname} date={date} mb="0px" />
        </CardContent>
      </div>
    </Card>
  )
}