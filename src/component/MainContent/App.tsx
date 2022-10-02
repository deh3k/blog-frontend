import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import Home from '../../page/Home/Home';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { authMe, setIsAppLoading } from '../../store/reducers/authSlice';
import Content from './Content';
import ScrollToTop from '../../hooks/ScrollToTop';
import AlertHandler from '../Common/AlertHandler';


function App() {
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector((state) => state.authReducer.isLoading)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authMe())
    } else {
      dispatch(setIsAppLoading(false))
    }
  }, [])

  if (isLoading) {
    return <Box></Box>
  }

  return (
    <Box display="flex" sx={{ flexDirection: "column", height: "100%" }}>
      <AlertHandler/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Content />} />
      </Routes>
      <ScrollToTop />
      <Footer />
    </Box>
  );
}

export default App;
