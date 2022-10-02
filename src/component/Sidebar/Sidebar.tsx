import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchSidebarPosts } from '../../store/reducers/sidebarSlice'
import SmallPostSkeleton from '../Skeletons/SmallPostSkeleton'
import SbCategories from './SbCategories'
import SmallPost from './SmallPost'
import StickySidebar from './StickySidebar'
import TrendingPosts from './TrendingPosts'

export default function Sidebar() {

 
  return (
    <StickySidebar>
      <TrendingPosts/>
      <SbCategories/>
    </StickySidebar>
  )
}


