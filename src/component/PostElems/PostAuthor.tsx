import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface IProps {
  id: string
  photo?: string
  name: string
  date: string
  mb: string
}

export default function PostAuthor({ mb = '12px', ...props }: IProps) {
  return (
    <Box display="flex" sx={{ 
      mr: '24px', 
      mb: mb, 
      flexDirection: {sm: 'row', xs: 'column'}, 
      alignItems: {sm: 'center', xs: 'flex-start'}, 
    }}>
      <Box component={NavLink} to={`/posts/${props.id}`} display="flex" alignItems="center" sx={{textDecoration: 'none', mb: {sm: '0', xs: '8px'}}}>
        {props.photo ? 
          <Box component="img" src={`${process.env.REACT_APP_API_URL}${props.photo}`} sx={{ width: '36px', height: '36px', borderRadius: '100%', mr: '6px'}} />
          :
          <Avatar sx={{ width: '36px', height: '36px', mr: '6px', borderRadius: '100%', backgroundColor: 'primary.light' }}/>
        }
        
        <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 600, mr: '10px' }}>
          {props.name}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {props.date}
      </Typography>
    </Box>
  )
}
