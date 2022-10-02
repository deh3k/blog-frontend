import { Box, Skeleton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import Sidebar from '../component/Sidebar/Sidebar';
import Toolbar from '../component/Toolbar/Toolbar';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchUser, fetchUserPosts, resetUser } from '../store/reducers/userPostsSlice';
import ToolbarTabs from '../component/Toolbar/ToolbarTabs';
import Paginator from '../component/Common/Paginator';
import BlogList from '../component/Common/BlogList';


export default function UserPosts() {

  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const posts = useAppSelector((state) => state.userPostsReducer.posts)
  const totalCount = useAppSelector(state => state.userPostsReducer.totalCount)
  const isLoading = useAppSelector(state => state.userPostsReducer.isLoading)
  const user = useAppSelector(state => state.userPostsReducer.user)
  const authorId = useAppSelector(state => state.userReducer.user._id)

  const [isAuthor, setIsAuthor] = useState(false)
  const [sort, setSort] = useState('createdAt')
  const [page, setPage] = useState(1)

  const dispatch = useAppDispatch()

  useEffect(() => {
    return (() => {
      dispatch(resetUser())
    })
  }, [])

  useEffect(() => {
    if (params.userId) {
      dispatch(fetchUser(params.userId))
      dispatch(fetchUserPosts({userId: params.userId, query: {
        page: 1,
        term: '',
        category: '',
        sort: 'createdAt'
      }}))
    }
  }, [params.userId])

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
    dispatch(fetchUserPosts({userId: params.userId, query: { 
      page, 
      term: searchParams.get('term'), 
      category: searchParams.get('category'), 
      sort 
    }}))
  }, [sort, page, searchParams.get('term'), searchParams.get('category')])

  useEffect(() => {
    if (authorId === user._id) {
      setIsAuthor(true)
    } else {
      setIsAuthor(false)
    }
  }, [authorId, user])


  return (
    <Container maxWidth="lg" sx={{p: 0}}>
      <Box sx={{ mb: '40px', display: 'flex', alignItems: 'stretch' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Box textAlign='center' sx={{p: '15px 0 5px', backgroundColor: 'white',}}>
            {user.nickname ?
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                {user.nickname}'s' posts
              </Typography>
              :
              <Skeleton variant="text" width={200} height={40} sx={{ margin: '0 auto', }} />
            }
          </Box>
          <Toolbar>
            <ToolbarTabs sort={sort} onChange={setSort} isLoading={isLoading}/>
          </Toolbar>
          <BlogList posts={posts} isLoading={isLoading} isAuthor={isAuthor} />
          <Paginator totalCount={totalCount} />
        </Box>
        <Sidebar />
      </Box>

    </Container>
  )
}
