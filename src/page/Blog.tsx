import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Toolbar from '../component/Toolbar/Toolbar'
import Sidebar from '../component/Sidebar/Sidebar'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchPosts } from '../store/reducers/blogSlice'
import Paginator from '../component/Common/Paginator'
import ToolbarTabs from '../component/Toolbar/ToolbarTabs'
import { useSearchParams } from 'react-router-dom'
import BlogList from '../component/Common/BlogList'

export default function Blog() {

  const [searchParams, setSearchParams] = useSearchParams();

  const posts = useAppSelector((state) => state.blogReducer.posts)
  const totalCount = useAppSelector(state => state.blogReducer.totalCount)
  const isLoading = useAppSelector(state => state.blogReducer.isLoading)
  
  const [sort, setSort] = useState('createdAt')
  const [page, setPage] = useState(1)

  const dispatch = useAppDispatch()

  // fixed bug with three reload, because in the start we don't have a page 
  useEffect(() => {
    const currentPage = Number(searchParams.get('page'))
    if(currentPage) {
      setPage(currentPage)
    } else {
      setPage(1)
    }
  }, [searchParams.get('page')])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchPosts({ 
      page, 
      term: searchParams.get('term'), 
      category: searchParams.get('category'), 
      sort 
    }))
  }, [sort, page, searchParams.get('term'), searchParams.get('category')])



  return (
    <Container maxWidth="lg" sx={{ mb: '40px', display: 'flex', alignItems: 'stretch', p: 0 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <ToolbarTabs sort={sort} onChange={setSort} isLoading={isLoading}/>
        </Toolbar>
        <BlogList posts={posts} isLoading={isLoading} />
        <Paginator totalCount={totalCount} />
      </Box>
      <Sidebar />
    </Container>
  )
}
