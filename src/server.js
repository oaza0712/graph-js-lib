// dependencies
const express = require("express");
const path = require('path');

const app = express();

app.use(express.static("."));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+ '/index.html'));
  });
  

app.post("/", (req, res) => {
   res.send("This is home page with post request.");
});

// PORT
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});
