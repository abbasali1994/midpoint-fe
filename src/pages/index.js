import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';

const Dashboard = () => (
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
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;