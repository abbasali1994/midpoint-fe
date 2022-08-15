import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

const orders = [
  {
    id: uuid(),
    name: 'Twitter API',
    latency: 3.5,
    gas:"$ 104.20",
    requests: 15550,
    errors: 0.1
  },
  {
    id: uuid(),
    name: 'Discord API',
    latency: 0.5,
    gas:"$ 1024.20",
    requests: 5550,
    errors: 11.5
  },
  {
    id: uuid(),
    name: 'CPI Oracle',
    latency: 30.5,
    gas:"$ 1187.20",
    requests: 15550,
    errors: 0.001
  },
];

export const LatestOrders = ({ title}) => (
  <Card>
    <CardHeader title={title} />
    <PerfectScrollbar>
      <Box >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Names
              </TableCell>
              <TableCell>
                Requests
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Errors (%)
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Latency, Median (ms)
              </TableCell>
              <TableCell>
                Gas
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.name}
                </TableCell>
                <TableCell>
                  {order.requests}
                </TableCell>
                <TableCell>
                  {order.errors} %
                </TableCell>
                <TableCell>
                  {order.latency} ms
                </TableCell>
                <TableCell>
                  {order.gas}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
);
