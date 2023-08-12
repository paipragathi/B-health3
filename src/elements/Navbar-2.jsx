import * as React from 'react';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
import logo from "../assets/logo.png";


function ResponsiveAppBar() {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <AppBar position="fixed"sx={{backgroundColor:'white',boxShadow: "h-shadow v-shadow blur spread color" ,height:"90px"}}>
     
        <Toolbar>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              // mr: 0,
              // display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              fontFamily: 'Tahoma',
              fontWeight: 500,
              fontSize:"60px",
              padding:"0 0 0 0",
              letterSpacing: '0.1rem',
              color: 'black',
              textDecoration: 'none',
              //  top:'0',
              marginTop: '0.3em',
              left: '900px', 
            }}
          >
          B-HEALTH
          </Typography>
          <img src={logo} style={{position:"absolute", height:"85px", top:"3px", left:"1220px"}}alt="" />

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> */}
           
            {/* <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}x
            </Menu> */}
          {/* </Box> */}
          
        
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#000428', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box> */}
{/* 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          
        </Toolbar>
      
    </AppBar>
  );
}
export default ResponsiveAppBar;
