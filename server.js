const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file if available
try {
  require('dotenv').config();
} catch (err) {
  console.log('No .env file found or error loading it');
}

// Import routes - handle potential errors if files don't exist yet
let placesRoutes;
let workersRoutes;

try {
  placesRoutes = require('./routes/places');
  workersRoutes = require('./routes/workers');
} catch (err) {
  console.error('Error loading routes:', err.message);
  
  // Create fallback routes to avoid crashes
  placesRoutes = express.Router();
  placesRoutes.get('/', (req, res) => res.json({ message: 'Places API not yet implemented' }));
  
  workersRoutes = express.Router();
  workersRoutes.get('/', (req, res) => res.json({ message: 'Workers API not yet implemented' }));
}

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/places', placesRoutes);
app.use('/api/workers', workersRoutes);

// Root route - enhanced with more info for debugging
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'WhatsApp API Backend is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      places: '/api/places',
      workers: '/api/workers'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Set port with fallback and alternative options
const findAvailablePort = (startPort) => {
  return new Promise((resolve) => {
    const server = require('http').createServer();
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
    server.on('listening', () => {
      server.close(() => {
        resolve(startPort);
      });
    });
    server.listen(startPort);
  });
};

// Start server with dynamic port selection - simplified for hosting platforms
const startServer = async () => {
  try {
    // Most hosting platforms provide a PORT environment variable
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api/...`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Export for potential testing
module.exports = app;
