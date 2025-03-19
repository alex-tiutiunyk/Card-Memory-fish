const express = require('express');
const { saveGameData, fetchGameData } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.put('/save/:id', saveGameData);
router.get('/results/:id', fetchGameData);

module.exports = router;
