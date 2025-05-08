const express = require('express');
const router = express.Router();
const { sendWhatsAppMessage } = require('../utils/whatsappService');
const { workers } = require('../data/mockData');

// POST - Get available workers for a specific place
router.post('/available', (req, res) => {
  try {
    const { placeId } = req.body;
    
    if (!placeId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a place ID'
      });
    }
    
    // Filter workers by place ID
    const availableWorkers = workers.filter(worker => 
      worker.placeId === parseInt(placeId) && worker.available === true
    );
    
    res.status(200).json({
      success: true,
      data: availableWorkers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available workers',
      error: error.message
    });
  }
});

// POST - Select a worker and get their contact info
router.post('/select', async (req, res) => {
  try {
    const { workerId } = req.body;
    
    if (!workerId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a worker ID'
      });
    }
    
    const worker = workers.find(w => w.id === parseInt(workerId));
    
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found'
      });
    }
    
    // Simulate sending a WhatsApp message to the client
    try {
      await sendWhatsAppMessage(
        worker.phone, 
        `A client has requested your services. Please contact them for more information.`
      );
    } catch (whatsappError) {
      console.error('WhatsApp notification failed:', whatsappError);
      // Continue to respond even if WhatsApp notification fails
    }
    
    res.status(200).json({
      success: true,
      data: {
        name: worker.name,
        phone: worker.phone,
        location: worker.location
      },
      message: 'Worker has been notified via WhatsApp'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process worker selection',
      error: error.message
    });
  }
});

// POST - General logger endpoint to receive and log any data
router.post('/log', (req, res) => {
  try {
    // More verbose logging of the request body
    console.log('=== POST REQUEST BODY LOG ===');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body received:', req.body);
    console.log('Stringified body:', JSON.stringify(req.body, null, 2));
    console.log('=== END POST REQUEST LOG ===');
    
    res.status(200).json({
      success: true,
      message: 'Data received and logged successfully',
      timestamp: new Date().toISOString(),
      receivedData: req.body // Echo back the received data
    });
  } catch (error) {
    console.error('Error in log endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log data',
      error: error.message
    });
  }
});

// GET - Alternative log endpoint for GET requests
router.get('/log', (req, res) => {
  try {
    // Log the query parameters
    console.log('Received GET request with query params:', JSON.stringify(req.query, null, 2));
    
    res.status(200).json({
      success: true,
      message: 'GET request logged successfully',
      timestamp: new Date().toISOString(),
      query: req.query
    });
  } catch (error) {
    console.error('Error in GET log endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log GET request',
      error: error.message
    });
  }
});

module.exports = router;
