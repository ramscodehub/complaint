// Import the database query function
const db = require('../db');

// Controller function to create a new complaint
const createComplaint = async (req, res) => {
  try {
    // 1. Destructure the name, email, and complaint from the request body (CORRECTED LINE)
    const { name, email, complaint } = req.body;

    // 2. Basic Input Validation
    if (!name || !email || !complaint) {
      return res.status(400).json({ error: 'Name, email, and complaint fields are required.' });
    }

    // 3. The SQL query to insert a new complaint into the database
    // We use $1, $2, $3 as placeholders to prevent SQL injection attacks
    const insertQuery = `
      INSERT INTO complaints (name, email, complaint)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    // 4. The values to be inserted, in the correct order
    const values = [name, email, complaint];

    // 5. Execute the query using our db module
    const { rows } = await db.query(insertQuery, values);

    // 6. Send a success response back to the client with the new complaint data
    // The 'rows[0]' contains the newly created record from the 'RETURNING *' clause
    res.status(201).json(rows[0]);

  } catch (error) {
    // 7. If any error occurs, log it and send a generic server error response
    console.error('Error creating complaint:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

// Controller function to get all complaints
const getAllComplaints = async (req, res) => {
  try {
    // 1. The SQL query to select all records from the complaints table
    // We'll order them by the creation date to see the newest ones first
    const selectQuery = 'SELECT * FROM complaints ORDER BY created_at DESC';

    // 2. Execute the query
    const { rows } = await db.query(selectQuery);

    // 3. Send the list of complaints back to the client
    res.status(200).json(rows);

  } catch (error) {
    // 4. If an error occurs, log it and send a server error response
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

// Controller function to update a complaint's status
const updateComplaintStatus = async (req, res) => {
  try {
    // 1. Get the ID from the URL parameters (e.g., /complaints/1)
    const { id } = req.params;
    // 2. Get the new status from the request body
    const { status } = req.body;

    // 3. Basic validation
    if (!status || !['Pending', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status provided. Must be "Pending" or "Resolved".' });
    }

    // 4. The SQL query to update a specific complaint's status
    // We use RETURNING * to get the updated row back
    const updateQuery = `
      UPDATE complaints 
      SET status = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const values = [status, id];

    // 5. Execute the query
    const { rows } = await db.query(updateQuery, values);

    // 6. Check if a row was actually updated. If not, it means the ID didn't exist.
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    // 7. Send the updated complaint data back to the client
    res.status(200).json(rows[0]);

  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

// Controller function to delete a complaint
const deleteComplaint = async (req, res) => {
  try {
    // 1. Get the ID from the URL parameters
    const { id } = req.params;

    // 2. The SQL query to delete a specific complaint
    // We will check the rowCount from the result to see if anything was deleted
    const deleteQuery = 'DELETE FROM complaints WHERE id = $1';
    const values = [id];

    // 3. Execute the query
    const result = await db.query(deleteQuery, values);

    // 4. Check if a row was actually deleted. If rowCount is 0, the ID didn't exist.
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Complaint not found.' });
    }

    // 5. Send a success response with no content, which is standard for DELETE operations
    res.status(204).send();

  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};


// Export the function so our routes can use it
module.exports = {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint
};