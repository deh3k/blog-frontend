import { Box, Dialog, CircularProgress } from '@mui/material'
import React from 'react'
import Loader from './Loader'

export default function DialogLoader (props: { open: boolean }) {
  return (
    <Dialog open={props.open} PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0)', boxShadow: 0, p: '20px' } }}>
      <Box sx={{ display: 'flex'}}>
        <CircularProgress size={60} sx={{ margin: 'auto', marginTop: '10%', color: 'white'}}/>
      </Box>
    </Dialog>
  )
}