import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginForm from '../../component/AuthForm/LoginForm'

export default function Login() {
  return (
    <Box sx={{
      maxWidth: '400px',
      margin: 'auto',
    }}>
      <Box sx={{
        backgroundColor: 'white',
        p: '40px',
        mb: '20px'
      }}>
        <Typography component={'h2'} variant={"h4"} sx={{ fontWeight: 600, mb: '50px' }} color="text.primary">
          Login
        </Typography>
        <LoginForm/>
        <Typography color="text.primary" sx={{fontWeight: '600'}}>Test Account:</Typography>
        <Typography color="text.primary"><span style={{fontWeight: '600'}}>Email:</span> test@gmail.com</Typography>
        <Typography color="text.primary"><span style={{fontWeight: '600'}}>Password:</span> 123456789</Typography>
      </Box>
      <Box sx={{
        backgroundColor: 'white',
        p: '18px',
        textAlign: 'center'
      }}>
        <Typography component={'span'} sx={{ mr: '6px' }} color="text.primary">Don't have an account yet?</Typography>
        <Typography component={NavLink} to="/register" color="primary.light" sx={{textDecoration: 'none'}}>Registration</Typography>
      </Box>
    </Box>
  )
}
