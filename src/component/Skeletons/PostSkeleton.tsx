import { Box, Card, Skeleton } from '@mui/material'
import React from 'react'
import DialogLoader from '../Common/DialogLoader'

export default function PostSkeleton() {
  return (
    <>
      <Card sx={{ p: 3, boxShadow: 0, backgroundColor: 'white', flexGrow: 1 }}>
        <Box display="flex" alignItems="center">
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: '8px' }} />
          <Skeleton variant="text" width='30%' height={20} />
        </Box>
        <Skeleton variant="text" width='100%' height={40} />
        <Skeleton variant="text" width='30%' height={40} sx={{ mb: '20px' }} />
        <Skeleton variant="rectangular" width={'100%'} height={405}/>
      </Card>
    </>
  )
}
