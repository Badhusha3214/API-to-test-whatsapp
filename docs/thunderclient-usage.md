# Using Thunder Client with WhatsApp API Backend

Thunder Client is a lightweight REST API client extension for Visual Studio Code, similar to Postman but integrated directly into VS Code.

## Setting Up Thunder Client

1. **Install the Extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Thunder Client"
   - Click Install

2. **Import the Collection**:
   - After installation, click on the Thunder Client icon in the VS Code sidebar
   - Click on "Collections" tab
   - Click the "Import" button
   - Select the `thunder-collection.json` file from your project folder

## Running the Tests

1. **Start your server**:
   ```
   npm start
   ```
   or
   ```
   npm run dev
   ```

2. **Open Thunder Client in VS Code**:
   - Click on the Thunder Client icon in the sidebar
   - Open the "WhatsApp API Backend" collection

3. **Run Individual Requests**:
   - Click on any request to open it
   - Click the "Send" button to execute the request
   - View the response in the right panel

4. **Run the Entire Collection**:
   - Right-click on the "WhatsApp API Backend" collection
   - Select "Run All"
   - View the test results summary

## API Endpoints in the Collection

### Places
- `GET http://localhost:3000/api/places` - Get all places
- `GET http://localhost:3000/api/places/1` - Get a specific place

### Workers
- `POST http://localhost:3000/api/workers/available` - Get available workers for a place
- `POST http://localhost:3000/api/workers/select` - Select a worker by ID
- `POST http://localhost:3000/api/workers/select` (Invalid ID) - Test error handling
- `POST http://localhost:3000/api/workers/select` (Missing ID) - Test validation

## Using a Different Port

If your server is running on a different port:

1. Click on the "Environment" tab in Thunder Client
2. Create a new environment (e.g., "Custom Port")
3. Add a variable `baseUrl` with value `http://localhost:YOUR_PORT`
4. Edit each request to use `{{baseUrl}}/api/...` instead of the hardcoded URL

## Additional Thunder Client Features

- **Variables**: Create and use environment variables
- **Pre-request Script**: Run JavaScript code before requests
- **Tests**: Write test scripts to validate responses
- **Authentication**: Handle various auth methods
- **Collections**: Organize requests in folders
- **Run Collection**: Run all requests in a collection

[Thunder Client Documentation](https://www.thunderclient.com/docs)
