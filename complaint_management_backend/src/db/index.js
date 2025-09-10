// Import the Pool class from the pg library
const { Pool } = require('pg');

// Create a new Pool instance
// The Pool will automatically use the environment variables we set in .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // This is necessary for some cloud providers
  }
});

// We export a query function that will be used by our controllers
// This simplifies database queries in other parts of our application
module.exports = {
  query: (text, params) => pool.query(text, params),
};