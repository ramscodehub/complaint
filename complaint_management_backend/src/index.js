const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('DB_DATABASE:', process.env.DB_DATABASE);
const complaintRoutes = require('./routes/complaintRoutes');


const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, the complaint management API is running!');
});

app.use('/complaints', complaintRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});