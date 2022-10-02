import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/authSlice';

const settings = [
  { name: 'Account', to: 'account' },
  { name: 'Write post', to: 'add-post'},
];

export default function UserMenu() {

  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.userReducer.user)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {user.photo
            ? 
            <Avatar alt={user.nickname} src={`${process.env.REACT_APP_API_URL}${user.photo}`} />
            :
            <Avatar sx={{backgroundColor: 'primary.light'}}/>
          }
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem component={NavLink} to={`/${setting.to}`} key={setting.name} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting.name}</Typography>
          </MenuItem>
        ))}
        <MenuItem component={NavLink} to={`/posts/${user._id}`} onClick={handleCloseUserMenu}>
          <Typography textAlign="center">My posts</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
