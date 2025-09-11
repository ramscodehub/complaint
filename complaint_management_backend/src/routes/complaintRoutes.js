const express = require('express');
const router = express.Router();

const { createComplaint } = require('../controllers/complaintController');
const { getAllComplaints } = require('../controllers/complaintController');
const { updateComplaintStatus } = require('../controllers/complaintController');
const { deleteComplaint } = require('../controllers/complaintController');


router.post('/', createComplaint);

// Define the GET route for '/'
router.get('/', getAllComplaints);

// Define the PATCH route for '/:id'
router.patch('/:id', updateComplaintStatus);

// Define the DELETE route for '/:id'
router.delete('/:id', deleteComplaint);

// Export the router
module.exports = router;