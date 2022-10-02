import { Box, Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import StyledTitle from '../component/Common/StyledTitle'

export default function About() {
  return (
    <Container maxWidth="lg">
      <StyledTitle title="Learn More About Us" />
      <div style={{ textAlign: "center" }}>
        <Box
          component={'img'}
          src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
          sx={{
            height: 'auto',
            maxHeight: '480px',
            maxWidth: '960px',
            width: '100%',
            objectFit: 'cover',
            mb: '60px',
          }} />
      </div>
      <Box sx={{
        maxWidth: '840px',
        margin: '0 auto',
        mb: '50px',
      }}>
        <Typography variant="h6" sx={{ mb: '30px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((k) => (
            <Grid key={k} item md={6}>
              <Box>
                <Typography component="p" variant='h4' color="text.primary" sx={{ fontWeight: "500", mb: '30px' }}>Who We Are</Typography>
                <Typography variant="body1" color="text.secondary">Lorem ipsum Nisi amet fugiat eiusmod et
                  aliqua ad qui ut nisi Ut aute anim mollit fugiat
                  qui sit ex occaecat et eu mollit nisi pariatur fugiat
                  deserunt dolor veniam reprehenderit aliquip magna nisi
                  consequat aliqua veniam in aute ullamco Duis laborum ad non pariatur sit.
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
