import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';


import { Grid } from '@mui/material';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../../api/axiosConfig';
import HomeTableHead from '../home-table-head';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import { emptyRows } from '../utils';
import Scrollbar from '../../scrollbar';
import HomeTableRow from '../Home-table-row';

// ----------------------------------------------------------------------

export default function HomeView() {

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [billings, setBillings] = useState([]);

  const [maxRecords, setMaxRecords] = useState(0);

  const [searchParams] = useSearchParams();

  const orgId = searchParams.get("id")

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };


  const dataFiltered = billings;

  const notFound = !dataFiltered?.length && !!filterName;


  const fetchInvoices = async () => {
    try {
      const res = await axiosInstance(`/user/all`, {
        params: {
          page,
          size: rowsPerPage,
          orgId
        }
      });
      if (!res.data.isError) {
        setBillings(res.data.data.records)
        setMaxRecords(res.data.data.maxRecords || 0);
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchInvoices();
  }, [rowsPerPage, page])

  return (
    <Grid container gap={1}>
      <Grid item xs={12}>
        <Typography variant='h5'>Users</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <HomeTableHead
                  rowCount={maxRecords}
                  headLabel={[
                    { id: 'sl.no', label: 'Sl.no' },
                    { id: 'id', label: 'Id' },
                    { id: 'firstName', label: 'Firstname' },
                    { id: 'lastName', label: 'Lastname' },
                    { id: 'mobileNumber', label: 'Mobile' },
                    { id: 'email', label: 'Email' },
                    { id: 'role', label: 'Role' }, ,
                  ]}
                />
                <TableBody>
                  {dataFiltered?.map((row, index) => (
                    <HomeTableRow
                      key={index}
                      id={row._id}
                      slno={rowsPerPage * page + index + 1}
                      firstName={row.firstName}
                      lastName={row.lastName}
                      role={row.role}
                      email={row.email}
                      mobileNumber={row.mobileNumber}
                    />
                  ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, maxRecords)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={maxRecords}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Card>
      </Grid>
    </Grid>
  );
}
