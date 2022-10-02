import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { IPost } from '../../model/IPost'
import { dateConvert } from '../../utils/dateConvert'

interface IProps {
  img?: string
  title: string
  id: string
  date: string
}

export default function SmallPost(props: IProps) {

  const date = dateConvert(props.date)

  return (
    <Card sx={{ display: 'flex', mb: '24px', width: '100%', backgroundColor: 'transparent', boxShadow: '0' }}>
      {props.img &&
        <CardMedia
          component="img"
          sx={{ width: '80px', height: '60px', borderRadius: '4px' }}
          src={`${process.env.REACT_APP_API_URL}${props.img}`}
          alt="Live from space album cover"
        />
      }

      <CardContent sx={{ p: '0', '&:last-child': { p: '0 15px' } }}>
        <NavLink to={`/post/${props.id}`} style={{textDecoration: 'none'}}>
          <Typography component={'h6'} variant="subtitle2" color='text.primary' sx={{
            fontSize: '16px',
            textDecoration: 'none',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.3em',
            maxHeight: '2.6em',
          }}>
            {props.title}
          </Typography>
        </NavLink>
        <Typography component="p" variant="body2" color="text.secondary" sx={{
          lineHeight: '110%',
          mt: '8px',
        }}>
          {date}
        </Typography>
      </CardContent>
    </Card>
  )
}
