import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

interface IProps {
  color: string
  pages: {
    to: string
    name: string
  }[]
}

export default function Nav({pages, color}: IProps) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page, k) => (
        <NavLink key={page.name} style={{ textDecoration: "none" }} to={`/${page.to}`}>
          <Button
            sx={{ my: 0, display: 'block' }}
          >
            <Typography variant="subtitle1" color={color} sx={{ fontWeight: '700' }}>
              {page.name}
            </Typography>
          </Button>
        </NavLink>
      ))}
    </Box>
  )
}
