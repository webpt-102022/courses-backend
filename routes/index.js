const router = require('express').Router();

// @desc    REST API base url
// @route   GET /
// @access  Public
router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Connected to the API' });
});

module.exports = router;
