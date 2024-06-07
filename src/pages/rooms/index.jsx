// material-ui

import {
  Typography,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useRoom } from './hooks/useRoom';
import { AuthService } from './../../hooks/auth-service';

const columns = [
  { field: 'name', headerName: 'Name' },
  { field: 'id', headerName: 'ID' }
];

export default function RoomsPage() {
  const { master, room, handleChangePage, handleChangePerPage, handleUserJoinRoom, handleCreateRoom } = useRoom();
  const { getUserData } = AuthService();
  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserData();
      if (res) {
        setUser(res);
      } else {
        handleLogout();
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (master) {
      setRows(room);
      setDataRows(master);
    }
  }, [master, room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const rateDefault = formData.get('rateDefault');

    const result = await handleCreateRoom({ name, rateDefault, owner_id: user?._id });
    if (result.status === 200) {
      handleClose();
      handleJoinRoom(result?.data?._id, user?._id);
    }
  };

  const handleOnPageChange = (event, newPage) => {
    handleChangePage && handleChangePage(newPage + 1, dataRows.per_page);
  };

  const handleChangeRowsPerPage = (event) => {
    handleChangePerPage && handleChangePerPage(parseInt(event.target.value, 10));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = () => {
    if (!rows) return [];
    return rows.sort((a, b) => {
      if (orderBy) {
        if (order === 'asc') {
          return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
          return a[orderBy] > b[orderBy] ? -1 : 1;
        }
      }
      return 0;
    });
  };

  const handleJoinRoom = async (roomId, userId) => {
    const result = await handleUserJoinRoom(roomId, userId);
    if (result.status == 200) {
      navigate(`/rooms/${roomId}`);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <TableContainer>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          <Typography variant="h5">Room Page</Typography>
          <Button variant={'contained'} onClick={handleOpen}>
            Create room
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={`column-${index}-${column.headerName}`}>
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderBy === column.field ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, column.field)}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows && rows.length > 0 ? (
              sortedRows().map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography
                      sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                      // onClick={() => {
                      //   navigate(`/rooms/${row.id}`);
                      // }}
                      onClick={() => handleJoinRoom(row.id, user._id)}
                      variant="subtitle1"
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <Typography variant="subtitle1" color="secondary">{`No data`}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataRows.total || 0}
        rowsPerPage={dataRows.per_page || 5}
        page={dataRows.page - 1 || 0}
        onPageChange={handleOnPageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog fullWidth maxWidth={'xs'} open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Room</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth type="text" label="Name" name="name" variant="filled" placeholder="Name" required />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth type="number" label="Rate default" name="rateDefault" variant="filled" placeholder="Rate default" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button type="submit" variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Card>
  );
}
