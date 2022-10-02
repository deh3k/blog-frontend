import { Box, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import RegisterForm from '../../component/AuthForm/RegisterForm'

export default function Register() {
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
          Registration
        </Typography>
        <RegisterForm/>
      </Box>
      <Box sx={{
        backgroundColor: 'white',
        p: '18px',
        textAlign: 'center'
      }}>
        <Typography component={'span'} sx={{ mr: '6px' }} color="text.primary">Already registered?</Typography>
        <Typography component={NavLink} to={'/login'} color="primary.light" sx={{textDecoration: 'none'}}>Login</Typography>
      </Box>
    </Box>
  )
}
