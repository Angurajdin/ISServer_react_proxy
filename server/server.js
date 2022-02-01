const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const Home = require('./routes/HomeRouter');
app.use(cors());
app.use(express.json());

app.use('/api',Home);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});