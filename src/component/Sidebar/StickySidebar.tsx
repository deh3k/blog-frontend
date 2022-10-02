import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { useStickySidebar } from '../../hooks/useStickySidebar'

interface IProps {
  children: React.ReactNode
}

export default function StickySidebar({children}: IProps) {

  const sidebarRef = useRef<HTMLDivElement>(null)
  const {sidebarPos, edge, marginT} = useStickySidebar(sidebarRef)

  return (
    <>
      <Box sx={{ 
        display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' }, 
        flexDirection: 'column', 
        minHeight: '100%', 
        flex: '1', 
        maxWidth: '330px',
        minWidth: { lg: '330px', md: '330px', sm: '0', xs: '0' },
        ml: { lg: '15px', md: '15px', sm: '0', xs: '0' },
        position: 'relative' 
      }}>
        <Box sx={{ flex: edge === 'bot' ? '1' : undefined }}></Box>
        <Box ref={sidebarRef} sx={{
          position: sidebarPos,
          bottom: edge === 'bot' && sidebarPos === 'sticky' ? 10 : undefined,
          top: edge === 'top' && sidebarPos === 'sticky' ? 10 : undefined,
          marginTop: sidebarPos === 'absolute' ? `${marginT}px` : '0',
          display: { lg: 'block', md: 'block', sm: 'none', xs: 'none' },
          width: '100%',
        }}>
          {children}
        </Box>
      </Box>
    </>

  )
}
