import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const categories = [
  'Travel',
  'Science',
  'Technology',
  'My story',
  'Animals',
  'Sci-Fi',
  'Health',
  'Sci-Pop',
  'Design',
  'IT'
]

export default function SbCategories() {

  const [searchParams, setSearchParams] = useSearchParams()

  const resetHandler = () => {
    searchParams.delete('category')
    searchParams.delete('term')
    setSearchParams(searchParams)
  }

  const clickHandler = (category: string) => {
    setSearchParams({ page: '1', category })
  }

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Typography component="h6" variant="h5" sx={{ fontSize: '18px', fontWeight: '500', mb: '16px' }}>
        Categories
      </Typography>
      <Box component="div" sx={{ pt: '8px', pb: '8px', borderBottom: '1px solid rgba(0, 0, 0, 0.15);' }}>
        <Typography onClick={() => resetHandler()} variant="h6" sx={{
          fontSize: '16px',
          fontWeight: '500',
          textDecoration: 'none',
          color: 'primary.main',
          '&:hover': {
            cursor: 'pointer'
          }
        }}>
          All
        </Typography>
      </Box>
      {categories.map((category) => (
        <Box key={category} component="div" sx={{ pt: '8px', pb: '8px', borderBottom: '1px solid rgba(0, 0, 0, 0.15);' }}>
          <Typography onClick={() => clickHandler(category)} variant="h6" sx={{
            fontSize: '16px',
            fontWeight: '500',
            textDecoration: 'none',
            color: 'primary.main',
            '&:hover': {
              cursor: 'pointer'
            }
          }}>
            {category}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
