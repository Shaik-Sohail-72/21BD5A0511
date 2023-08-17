import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'; // Import Axios


export default function GetTrain() {
  const [searchId, setSearchId] = useState('');
  const [eachItem, setProductData] = useState(null);

  const handleSearch = () => {
    if (!searchId) return;

    axios.get(`http://localhost:5000/train_by_ID/${searchId}`)
      .then(response => setProductData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const typographyStyle = {
    marginBottom: '12px',
    fontSize: '18px',
  };
  return (
    <div>
    <Navbar />
        <div className="container-fluid" style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            component="form"
            sx={{
              p: '6px 50px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: 400,
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Enter Train Number"
              inputProps={{ 'aria-label': 'Enter Train Number' }}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '25px' }} aria-label="search" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      {eachItem && (
          <div className="container-fluid">
            <Card sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'center', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)'}}>
              <CardHeader title="Train Details" />
              <CardContent>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Train Name:</strong> {eachItem.trainName}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Train Number:</strong> {eachItem.trainNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Departure Time:</strong>{eachItem.departureTime.Hours}hours {eachItem.departureTime.Minutes}min {eachItem.departureTime.Seconds}sec
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Seats Available (Sleeper):</strong> {eachItem.seatsAvailable.sleeper}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Seats Available (AC):</strong> {eachItem.seatsAvailable.AC}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Price (Sleeper):</strong> {eachItem.price.sleeper}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Price (AC):</strong> {eachItem.price.AC}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                  <strong>Delayed : {eachItem.delayedBy}</strong> 
                </Typography>
              </CardContent>
            </Card>
          </div>
      )}
      <Footer />
    </div>
  );
}
