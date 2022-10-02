import { Box, Container, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import ChangeAvatar from '../../component/ChangeAvatar/ChangeAvatar'
import DialogChange from '../../component/DialogsForm/DialogChange'
import DialogChangePassoword from '../../component/DialogsForm/DialogChangePassword'
import { useAppSelector } from '../../hooks/redux'
import { useCheckAuth } from '../../hooks/useCheckAuth'

export default function Account() {

  useCheckAuth()

  const user = useAppSelector(state => state.userReducer.user)  

  return (
    <Container maxWidth="lg" sx={{p: 0}}>
      <Paper elevation={0} sx={{ p: '15px' }}>
        <Box display="flex" alignItems="center" sx={{ mb: '20px', mr: '10px' }}>
          <ChangeAvatar/>
          <Typography variant="h5" sx={{ fontWeight: '600' }}>{user.nickname}</Typography>
        </Box>
        <Paper elevation={0} sx={{ backgroundColor: '#E5E8ED', p: '15px', mb: '15px' }}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ mb: '15px' }}>
            <div>
              <Typography variant="body1" sx={{ fontWeight: '500', fontSize: '18px' }}>Nickname:</Typography>
              <Typography>{user.nickname}</Typography>
            </div>
            <DialogChange target={'User Name'} />
          </Box>
          <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ mb: '15px' }}>
            <div>
              <Typography variant="body1" sx={{ fontWeight: '500', fontSize: '18px' }}>Email:</Typography>
              <Typography>{user.email}</Typography>
            </div>
            <DialogChange target={'Email'} />
          </Box>
        </Paper>
        <div>
          <Typography variant="body1" sx={{ fontWeight: '500', fontSize: '18px', mb: '10px' }}>Password:</Typography>
          <DialogChangePassoword />
        </div>
      </Paper>
    </Container>
  )
}


