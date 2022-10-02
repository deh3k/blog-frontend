import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';


const pages = [
  {name: 'Home', to: '',},
  {name: 'About', to: 'about'},
  {name: 'Blog', to: 'blog',},
]

export default function Footer() {
  return (
    <footer style={{backgroundColor: '#fff', marginTop: "60px"}}>
      <Container maxWidth="lg">
        <Box py={4}>
          <Box sx={{
            display:"flex", 
            flexWrap:"wrap", 
            alignItems:"center", 
            justifyContent:"space-between", 
            width:"100%",
            marginBottom:"15px",
          }}>
            <Box display="flex" alignItems="center">
              <AdbIcon sx={{ display: 'flex', mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#000000de',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </Box>
            <Box component="nav" sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginLeft: '20px',
            }}>
              {pages.map((page) => (   
                <Link key={page.name} style={{textDecoration:"none"}} to={`/${page.to}`}>
                  <Typography variant="body1" color="primary" sx={{mr: {md: '20px', xs: '10px'}, ml: {md: '30px', xs: '10px'}}}>{page.name}</Typography>
                </Link>                
              ))}
            </Box>
          </Box>
          <Divider/>
          <Box sx={{display: "flex", justifyContent:"space-between", marginTop:"15px"}}>
            <Typography color={'secondary'} component="p" variant="caption" gutterBottom={false}>© 2022 Deh3k rights reserved.</Typography>
            <Box display='flex'>
              <Link to="#">
                <FacebookIcon color="primary" sx={{marginLeft:"30px"}}/>
              </Link>
              <Link to="#">
                <TwitterIcon color="primary" sx={{marginLeft:"30px"}}/>
              </Link>
              <Link to="#">
                <InstagramIcon color="primary" sx={{marginLeft:"30px"}}/>
              </Link>
              <Link to="#">
                <LinkedInIcon color="primary" sx={{marginLeft:"30px"}}/>
              </Link>
            </Box>
          </Box>
        </Box>  
      </Container>
    </footer>
  );
}