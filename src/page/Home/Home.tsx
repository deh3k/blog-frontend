import { Box, Container, Grid, Typography } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import React, { useEffect } from 'react'
import Header from '../../component/Header/Header'
import StyledTitle from '../../component/Common/StyledTitle'
import './Home.scss'
import BlogItemCarousel from '../../component/BlogItem/BlogItemCarousel'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchSidebarPosts } from '../../store/reducers/sidebarSlice'


const urls = [
  "https://images.unsplash.com/photo-1482164565953-04b62dcac1cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
]

export default function Home() {

  const dispatch = useAppDispatch()

  const posts = useAppSelector(state => state.sidebarReducer.posts)

  useEffect(() => {
    dispatch(fetchSidebarPosts())
  }, [])

  return (
    <Box sx={{ flex: '1 0 auto' }}>
      <div className='home'>
        <Carousel
          cycleNavigation={true}
          navButtonsAlwaysInvisible={true}
          swipe={false}
          indicators={false}
          interval={6000}
          duration={800}
          stopAutoPlayOnHover={false}
          sx={{ position: 'absolute', width: '100%', height: '100vh', zIndex: "-11" }}
        >
          {urls.map((url, k) => <BgImg key={k} url={url} />)}
        </Carousel>
        <Header color="white" />
        <Container maxWidth="lg" sx={{ pb: '80px', mb: '120px' }}>
          <Box sx={{ maxWidth: '865px' }}>
            <Typography component="h1" color="white" sx={{
              typography: { md: 'h1', sm: 'h2', xs: 'h3' },
              fontWeight: { md: '900', sm: '900', xs: '900' },
              mb: '30px'
            }}>
              Enjoy your time with Createx Online Blog
            </Typography>
            <Typography component="p" sx={{
              typography: { md: 'h6', sm: 'body1' },
              fontSize: { sm: '18px' },
              color: 'rgba(255,255,255, 0.9)'
            }}>
              Far far away, behind the word mountains,
              far from the countries Vokalia and Consonantia
              there live the blind texts. Separated they live in
              Bookmarksgrove right at the coast of the Semantics,
              a large language ocean.
            </Typography>
          </Box>
        </Container>
      </div>
      <Container maxWidth="lg" sx={{ mb: '150px' }}>
        <StyledTitle title={'Trending'} />
        <Carousel
          animation="slide"
          duration={800}
        >
          {posts.map(post => <BlogItemCarousel key={post._id} post={post} />)}
        </Carousel>
      </Container>
      <Container maxWidth="lg">
        <StyledTitle title={'About Us'}></StyledTitle>
        <Box textAlign='center'>
          <Box
            component={'img'}
            src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg"
            sx={{
              height: 'auto',
              maxHeight: '480px',
              maxWidth: '960px',
              width: '100%',
              objectFit: 'cover',
              mb: '60px',
            }} />
        </Box>
        <Box sx={{
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          <Typography component="p" variant="h6" sx={{ mb: '30px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fuga sapiente eaque quo velit odit dolorem reiciendis autem debitis
            quidem maxime odio unde illum blanditiis tempora accusantium eos consequatur perspiciatis,
            eveniet nemo modi. Labore voluptatibus dolor magnam iusto, dolore ratione modi, qui
            esse laborum autem cum, distinctio optio culpa iure voluptate!
          </Typography>
          <Typography component="p" variant="h6" color="text.secondary" sx={{ fontWeight: '400', fontSize: '18px', mb: '60px' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Odit repellendus iusto iure sequi totam, ad ipsam voluptatibus, sunt porro
            cupiditate sit? Autem, deleniti? Accusantium provident in sapiente quos, reiciendis
            aliquam eaque dolorum nemo eligendi! Repellendus neque voluptas ullam quis!
            Consequuntur placeat eius modi saepe magnam illum incidunt culpa natus assumenda
            quisquam deserunt, vero harum exercitationem, nisi, impedit explicabo labore in!
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}


function BgImg({ url }: { url: string }) {
  return (
    <div className="home__bg">
      <Box component={'img'} src={url} sx={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }} />
    </div>
  )
}