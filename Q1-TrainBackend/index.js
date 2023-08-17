const express = require('express');
var cors = require('cors')
const app = express();
const PORT = 5000
app.use(cors());

app.get("/",function(req,res){
    res.send("Hello");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });