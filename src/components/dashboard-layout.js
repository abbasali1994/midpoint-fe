import { useAuth0 } from "@auth0/auth0-react";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import store from "src/store";
import { setUser } from 'src/store/userSlice';
import { DashboardNavbar } from './dashboard-navbar';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  // [theme.breakpoints.up('lg')]: {
  //   paddingLeft: 280
  // }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const {user, isAuthenticated} = useAuth0();
  
  useEffect(()=>{
    if(isAuthenticated) {
      store.dispatch(setUser(user))
    }
  },[isAuthenticated,user])
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      {/* <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      /> */}
    </>
  );
};
