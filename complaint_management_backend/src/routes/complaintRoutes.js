const express = require('express');
const router = express.Router();

// Import the controller function
const { createComplaint } = require('../controllers/complaintController');
const { getAllComplaints } = require('../controllers/complaintController');
const { updateComplaintStatus } = require('../controllers/complaintController');
const { deleteComplaint } = require('../controllers/complaintController');

// Define the POST route for '/'. 
// The full path will be '/complaints' because of how we'll use it in index.js
router.post('/', createComplaint);

// Define the GET route for '/'
router.get('/', getAllComplaints);

// Define the PATCH route for '/:id'
// The ':id' makes it a dynamic parameter accessible via req.params.id
router.patch('/:id', updateComplaintStatus);

// Define the DELETE route for '/:id'
router.delete('/:id', deleteComplaint);

// Export the router
module.exports = router;