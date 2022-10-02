import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import Logo from '../Common/Logo';
import BurgerMenu from './BurgerMenu';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../hooks/redux';
import Nav from './Nav';


const pages = [
  { name: 'Home', to: '', },
  { name: 'About', to: 'about', },
  { name: 'Blog', to: 'blog' },
];

interface HeaderProps {
  color: string
}

const Header: React.FC<HeaderProps> = (props) => {

  const isAuth = useAppSelector(state => state.authReducer.isAuth)

  return (
    <AppBar position="static" sx={{
      p: 0,
      boxShadow: 0,
      mb: "80px",
      backgroundColor: props.color === 'white' ? 'transparent' : 'white',
      borderBottom: props.color === 'white' ? 'none' : '1px solid #E5E8ED',
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
            <Logo color={props.color}/>
          </Box>

          <BurgerMenu color={props.color} pages={pages}/>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: "center" }}>
            <Logo color={props.color}/>
          </Box>
          
          <Nav color={props.color} pages={pages}/>
          {isAuth
            ? 
            <UserMenu/> 
            :
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Typography 
                component={NavLink} 
                to="/login" 
                color={props.color === 'black' ? "primary.light" : 'white'} 
                sx={{textDecoration: 'none', mr: '12px'}}
              >
                Login
              </Typography>
              <Typography 
                component={NavLink} 
                to="/register" 
                color={props.color === 'black' ? "primary.light" : 'white'} 
                sx={{textDecoration: 'none'}}
              >
                Register
              </Typography>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;