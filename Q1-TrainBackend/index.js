const express = require('express');
var cors = require('cors');
const axios=require("axios");
const app = express();
const PORT = 5000
app.use(cors());

async function getAllTrainsData() 
{
  const AUTH_TKN  ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyODExOTEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOGZhZTk3NTktMzdkMy00ZGYxLTgyYmMtMWExY2I2MmFkM2I0Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIxQkQ1QTA1MTEifQ.aABZcA3rcCD6wwd6uRYmmd4W2guGwVVs5u_k3S4NXRc";

  console.log(AUTH_TKN)
  try {
    const headers = {
      Authorization: `Bearer ${AUTH_TKN}`,
    };
    const response_data = await axios.get('http://20.244.56.144/train/trains', { headers });
    const trains_Data = response_data.data;
    return trains_Data;
  } catch (err) {
    console.error('Unable to fetch data:', err);
    throw err; 
  }
}
app.get('/All_Trains', async (req, res) => {
    try {
      const trainsData = await getAllTrainsData(); 
      let trains_data= trainsData
      let sortedTrains= sortingTrainData(trainsData);
      res.json(sortedTrains);
    } catch (error) {
      console.error('Unable to handle request:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  function mergeSort(arr, compareFunction) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    return merge(mergeSort(left, compareFunction), mergeSort(right, compareFunction), compareFunction);
  }
  
  function merge(left, right, compareFunction) {
    let result = [];
    let lidx = 0;
    let ridx = 0;
  
    while (lidx < left.length && ridx < right.length) {
      if (compareFunction(left[lidx], right[ridx]) <= 0) {
        result.push(left[lidx]);
        lidx++;
      } else {
        result.push(right[ridx]);
        ridx++;
      }
    }
  
    return result.concat(left.slice(lidx)).concat(right.slice(ridx));
  }
  
  function sortingTrainData(trains_data) {
    function compareTrains(a, b) {
      const priceComparison = a.price.AC - b.price.AC;
  
      if (priceComparison !== 0) {
        return priceComparison;
      }
  
      const seatsAvailableComparison = b.seatsAvailable.AC - a.seatsAvailable.AC;
      if (seatsAvailableComparison !== 0) {
        return seatsAvailableComparison;
      }
  
      const time1 = a.departureTime.Hours * 60 + a.departureTime.Minutes;
      const time2 = b.departureTime.Hours * 60 + b.departureTime.Minutes;
      return time2 - time1; // Sort by departure time in descending order
    }
  
    const sortedTrains = mergeSort(trains_data, compareTrains);
  
    // Filter trains where departure time > 30
    const filteredTrains = sortedTrains.filter(train => {
      const departureTime = train.departureTime.Hours * 60 + train.departureTime.Minutes;
      return departureTime > 30;
    });
  
    return filteredTrains;
  }
  
  
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });