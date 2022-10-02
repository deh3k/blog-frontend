import { Box, Card, Skeleton } from '@mui/material'
import React from 'react'

export default function BlogSkeleton() {
  return (
    <Card sx={{ mt: 3, p: 3, boxShadow: 0, backgroundColor: 'white' }}>
      <Box display="flex" alignItems="center">
        <Skeleton variant="circular" width={36} height={36} sx={{mr: '8px'}}/>
        <Skeleton variant="text" width='30%' height={20}/>
      </Box>
        <Skeleton variant="text" width='90%' height={40}/>
        <Skeleton variant="text" width='30%' height={20} sx={{mb: '20px'}}/>
        <Skeleton variant="rectangular" width={'100%'} height={305} />
    </Card>
  )
}
