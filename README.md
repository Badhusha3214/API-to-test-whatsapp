# WhatsApp API Backend

A Node.js backend for WhatsApp API integration.

## Setup and Installation

1. Install dependencies:
   ```
   npm install
   ```
   
   If you encounter issues with node-fetch, try installing it specifically:
   ```
   npm install node-fetch@2
   ```

2. Configure environment variables:
   - Create a `.env` file based on the provided example
   - Add your WhatsApp API credentials

3. Start the server:
   ```
   npm start
   ```
   
   For development with auto-reload:
   ```
   npm run dev
   ```

## Testing

1. Make sure the server is running in one terminal window.
2. In another terminal window, run the tests:
   ```
   npm test
   ```

## API Endpoints

- `GET /api/places` - List all places
- `GET /api/places/:id` - Get a specific place by ID
- `POST /api/workers/available` - Get available workers for a place
- `POST /api/workers/select` - Select a worker and get their contact information

## Test Examples

See the `tests/api-examples.md` file for detailed examples of how to use each endpoint.

## Troubleshooting

- If you encounter issues with dependencies, try:
  ```
  npm run install-deps
  ```

- For Node.js v18+, node-fetch might require different import syntax. The test script has been updated to handle this automatically.
"# API-to-test-whatsapp" 
