const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../utils/whatsappService');
const { places } = require('../data/mockData');

// GET - List available places
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: places
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve places',
      error: error.message
    });
  }
});

// GET - Get a specific place
router.get('/:id', (req, res) => {
  try {
    const place = places.find(p => p.id === parseInt(req.params.id));
    
    if (!place) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: place
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve place',
      error: error.message
    });
  }
});

module.exports = router;
