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
  Box
} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';

import SearchOutlined from '@ant-design/icons/SearchOutlined';

import { useState, useEffect } from 'react';
import { useCustomer } from './hooks/useCustomer';

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'fname', headerName: 'First name' },
  { field: 'lname', headerName: 'Last name' },
  {
    field: 'avatar',
    headerName: 'Image'
  },
  {
    field: 'username',
    headerName: 'Username'
  }
];

export default function CustomerPage() {
  const { master, customer, handleChangePage, handleChangePerPage, handleSubmitSearch } = useCustomer();
  const [dataRows, setDataRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (master) {
      setRows(customer);
      setDataRows(master);
    }
  }, [master, customer]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search || search.length >= 3) {
      handleSubmitSearch && handleSubmitSearch(search);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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

  return (
    <Card>
      <TableContainer>
        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
            <Typography variant="h5">Customer Page</Typography>
            <OutlinedInput
              size="small"
              id="header-search"
              startAdornment={
                <InputAdornment position="start" sx={{ mr: -0.5 }}>
                  <SearchOutlined />
                </InputAdornment>
              }
              aria-describedby="header-search-text"
              inputProps={{
                'aria-label': 'weight'
              }}
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
        </form>
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
            {sortedRows().map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fname}</TableCell>
                <TableCell>{row.lname}</TableCell>
                <TableCell>{row.avatar}</TableCell>
                <TableCell>{row.username}</TableCell>
              </TableRow>
            ))}
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
    </Card>
  );
}
