const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routes
const placesRoutes = require('./routes/places');
const workersRoutes = require('./routes/workers');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/places', placesRoutes);
app.use('/api/workers', workersRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('WhatsApp API Backend is running!');
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

// Start server with dynamic port selection
const startServer = async () => {
  try {
    const preferredPort = process.env.PORT || 3000;
    const PORT = await findAvailablePort(preferredPort);
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      // If we're using a different port than expected, provide the full URL
      if (PORT !== preferredPort) {
        console.log(`Note: Default port ${preferredPort} was in use.`);
        console.log(`API endpoints available at http://localhost:${PORT}/api/...`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
