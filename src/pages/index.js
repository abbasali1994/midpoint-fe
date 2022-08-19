import { useAuth0 } from "@auth0/auth0-react";
import { Box, Container, Grid } from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import store from 'src/store';
import { setUser } from 'src/store/userSlice';

const Dashboard = () => {
  return(
  <>
    <Head>
      <title>
        Dashboard
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
      <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
          >
            <LatestOrders title="Mainnet" />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
          >
            <LatestOrders  title="Testnet" />
          </Grid>
          

          <Grid
            item
            lg={6}
            md={12}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
