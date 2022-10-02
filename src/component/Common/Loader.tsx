import { Box, CircularProgress } from '@mui/material'

import React from 'react'

export default function Loader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <CircularProgress size={40} sx={{p: '50px', color: 'primary.main'}}/>
    </Box>
  )
}
