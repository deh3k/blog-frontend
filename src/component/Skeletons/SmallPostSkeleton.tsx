import { Box, Card, Skeleton } from '@mui/material'
import React from 'react'

export default function SmallPostSkeleton() {
  return (
    <Card sx={{ display: 'flex', mb: '24px',   boxShadow: 0, backgroundColor: 'white' }}>
      <Skeleton variant="rectangular" width={80} height={60} sx={{mr: '15px'}}/>
      <Box sx={{flexGrow: 1}}>
        <Skeleton variant="text" width='100%' height={16}/>
        <Skeleton variant="text" width='70%' height={16} sx={{mb: '10px'}}/>
        <Skeleton variant="text" width='50%' height={16}/>
      </Box>
    </Card>
  )
}
