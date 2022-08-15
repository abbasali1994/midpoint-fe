import styled from '@emotion/styled';
import { Create, Logout } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar,Typography, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Toolbar } from '@mui/material';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { userAccount, setUser } from 'src/store/userSlice';
import store from 'src/store';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from 'src/config';
import { Logo } from './logo';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const user = useSelector(userAccount)
  const { onSidebarOpen, ...other } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <DashboardNavbarRoot
        // sx={{
        //   left: {
        //     lg: 280
        //   },
        //   width: {
        //     lg: 'calc(100% - 280px)'
        //   }
        // }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
            <Typography
                color="primary"
                variant="h6"
                sx={{p:1}}
              >
                MidPoint
              </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          {user ? <Avatar onClick={handleClick}
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/avatars/avatar_6.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> :
            <NextLink
              href="/login"
              passHref
            ><Button
              color="primary"
              variant="contained"
            >
                Login / Sign up
              </Button>
            </NextLink>}

        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopup handleClose={handleClose}
        open={open}
        anchorEl={anchorEl} />
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};

const AccountPopup = ({ open, handleClose, anchorEl }) => {
  const handleLogout = () => {
    axios.post(SERVER_URL + '/user/logout').then(()=>{
      store.dispatch(setUser(false))
    })
    handleClose()
  }

  return (
    <Popover
      PaperProps={{
        sx: {
          padding: "12px 16px",
        },
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
      <List>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText primary="Create API Endpoint" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Popover>
  );
};