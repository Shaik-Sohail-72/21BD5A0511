import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'; // Import Axios library

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AllTrains() {
  const [products, setProducts] = useState([]); // Use state with useState

  useEffect(() => {
    axios.get('http://localhost:5000/All_Trains') // Use Axios to make a GET request
      .then((response) => {
        console.log(response.data);
        setProducts(response.data); // Update state with response data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Train Name</StyledTableCell>
              <StyledTableCell align="right">Train Number</StyledTableCell>
              <StyledTableCell align="right">Departure Time Hour</StyledTableCell>
              <StyledTableCell align="right">Seats Available</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Delayed By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {products.map((eachItem) => (
    <StyledTableRow key={eachItem.trainNumber}>
      <StyledTableCell component="th" scope="row">
        {eachItem.trainName}
      </StyledTableCell>
      <StyledTableCell align="right">{eachItem.trainNumber}</StyledTableCell>
      <StyledTableCell align="right">{eachItem.departureTime.Hours} Hours {eachItem.departureTime.Minutes} Min {eachItem.departureTime.Seconds} Sec</StyledTableCell>
      <StyledTableCell align="right">AC : {eachItem.seatsAvailable.sleeper} || Sleeper: {eachItem.seatsAvailable.AC}</StyledTableCell>
      <StyledTableCell align="right">AC : {eachItem.price.sleeper} || Sleeper: {eachItem.price.AC}</StyledTableCell>
      <StyledTableCell align="right">{eachItem.delayedBy}</StyledTableCell>

    </StyledTableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
