import { Typography } from '@mui/material'
import React from 'react'

interface TitleProps {
  title: string
  mb?: number
}

const StyledTitle: React.FC<TitleProps> = ({title, mb=6}) => {
  return (
    <Typography component={'h2'} variant={"h3"} sx={{fontSize: {sm: '3rem', xs: '2rem'}, fontWeight: 600, mb: mb }} align={"center"} color="text.primary">
      {title}
    </Typography>
  )
}

export default StyledTitle