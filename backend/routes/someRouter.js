const express = require('express');
const router = express.Router();

// Define routes for someRouter
router.get('/', (req, res) => {
  res.send('Response from someRouter');
});

// Ensure proper export of the router
module.exports = router;
