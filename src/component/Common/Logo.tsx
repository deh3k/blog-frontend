import AdbIcon from '@mui/icons-material/Adb';
import { Typography } from '@mui/material';
import React from 'react'

export default function Logo(props: {color: string}) {
  return (
    <>
      <AdbIcon sx={{ color: props.color, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 3,
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: props.color,
          textDecoration: 'none',
        }}
      >
        LOGO
      </Typography>
    </>

  )
}
