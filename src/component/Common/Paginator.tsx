import { Box, Pagination } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


interface IProps {
  totalCount: number
}

export default function Paginator(props: IProps) {

  const [searchParams, setSearchParams] = useSearchParams()

  const pagesCount = Math.ceil(props.totalCount/8) || 1

  const [page, setPage] = useState(1)

  const handleChange = (page: number) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    setSearchParams({...currentParams, page: page.toString()})
  }

  useEffect(() => {
    const currentPage = searchParams.get('page')
    if(currentPage) {
      setPage(Number(currentPage))
    } else {  
      const currentParams = Object.fromEntries(searchParams.entries())
      setSearchParams({...currentParams, page: '1'})
    }
  }, [searchParams.get('page')])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', p: '15px', mt: '10px' }}>
      <Pagination count={pagesCount} color="primary" size='medium' page={page} siblingCount={0} onChange={(event, page) => handleChange(page)} />
    </Box>
  )
}
