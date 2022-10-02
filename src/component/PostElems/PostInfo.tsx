import { Box, Typography } from '@mui/material'
import { Visibility, ModeComment } from '@mui/icons-material';
import React from 'react'

interface IProps {
  viewsCount: number
  commentsCount: number
}

export default function PostInfo(props: IProps) {
  return (
    <Box display="flex">
      <Box display="flex" alignItems='center' sx={{ mr: '18px' }}>
        <Visibility sx={{ color: 'primary.light', mr: '4px' }} />
        <Typography component={'span'} variant="subtitle2" color="primary.light">{props.viewsCount}</Typography>
      </Box>
      <Box display="flex" alignItems='center'>
        <ModeComment sx={{ color: 'primary.light', mr: '4px' }} />
        <Typography component={'span'} variant="subtitle2" color="primary.light">{props.commentsCount}</Typography>
      </Box>
    </Box>
  )
}
