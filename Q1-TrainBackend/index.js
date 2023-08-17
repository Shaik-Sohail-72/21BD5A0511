const express = require('express');
var cors = require('cors');
const axios=require("axios");
const app = express();
const PORT = 5000
app.use(cors());

async function getAllTrainsData() 
{
  const AUTH_TKN  ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyNzg5MjEsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiOGZhZTk3NTktMzdkMy00ZGYxLTgyYmMtMWExY2I2MmFkM2I0Iiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIxQkQ1QTA1MTEifQ.qroIM89HvwdH358TIUpgIoLmZ_FzQITS9PQQ95jUkDQ";

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
      res.json(trains_data);
    } catch (error) {
      console.error('Unable to handle request:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });