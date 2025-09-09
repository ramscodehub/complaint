// 1. Import necessary libraries
const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('DB_DATABASE:', process.env.DB_DATABASE);

// ****** NEW: IMPORT THE COMPLAINT ROUTES ******
const complaintRoutes = require('./routes/complaintRoutes');

// 2. Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5001; // Using the new port

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. A simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Hello, the complaint management API is running!');
});

// ****** NEW: USE THE COMPLAINT ROUTES ******
// Any request to '/complaints' will be handled by our complaintRoutes
app.use('/complaints', complaintRoutes);

// 5. Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});