import { Box, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import { NavLink } from 'react-router-dom'


interface IProps {
  color: string
  pages: {
    to: string
    name: string
  }[]
}

export default function BurgerMenu({pages, color}: IProps) {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        sx={{ color: color }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map((page) => (
          <MenuItem component={NavLink} to={`/${page.to}`} key={page.name} onClick={handleCloseNavMenu}>
            <Typography textAlign="center" color='text.primary'>{page.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
