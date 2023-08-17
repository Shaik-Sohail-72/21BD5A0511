const express = require('express');
var cors = require('cors');
const axios=require("axios");
const app = express();
const PORT = 5000
app.use(cors());

const my_creds = {
    "companyName" : "Train Central",
    "clientID": "8fae9759-37d3-4df1-82bc-1a1cb62ad3b4",
    "ownerName": "Shaik Sohail Hussain",
    "ownerEmail": "shaiksohailhu7n@gmail.com",
    "rollNo": "21BD5A0511",
    "clientSecret": "SnLTFioYayJwBotO"
    };


    async function generate_my_token(data_given) {
        try {
          const response = await axios.post('http://20.244.56.144/train/auth', data_given);
          const token = response.data.access_token;
          
          return token;
        } catch (error) {
          console.error('Unable to generate token', error);
          throw error;
        }
      }
      setInterval(async () => {
        auth_token = await generate_my_token({
            "companyName" : "Train Central",
            "clientID": "8fae9759-37d3-4df1-82bc-1a1cb62ad3b4",
"ownerName": "Shaik Sohail Hussain",
"ownerEmail": "shaiksohailhu7n@gmail.com",
"rollNo": "21BD5A0511",
"clientSecret": "SnLTFioYayJwBotO"
            });
      }, 60000);
async function getAllTrainsData() 
{
  const AUTH_TKN  =await generate_my_token(my_creds);

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
  


app.get('/train_by_ID/:trainId', async (req, res) => {
    try {
      const train_num = req.params.trainId;
      const AUTH_TKN = await generate_my_token(my_creds);
      
      const headers = {
        Authorization: `Bearer ${AUTH_TKN}`,
      };
  
      const train_data = await axios.get(`http://20.244.56.144/train/trains/${train_num}`, { headers });
      res.json(train_data.data);
  
    } catch (error) {
      console.error('Unable to fetch data', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });