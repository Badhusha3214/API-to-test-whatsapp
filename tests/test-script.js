// Simple test script to verify API functionality

let fetch;

// Handle different Node.js versions
try {
  // For Node.js >= 18
  if (parseInt(process.versions.node.split('.')[0]) >= 18) {
    fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  } else {
    // For Node.js < 18
    fetch = require('node-fetch');
  }
} catch (error) {
  console.error('Error loading fetch:', error.message);
  console.log('Please run: npm install node-fetch@2');
  process.exit(1);
}

// Allow port to be specified via environment or command line
const PORT = process.env.PORT || 
             (process.argv.find(arg => arg.startsWith('--port=')) || '')
              .replace('--port=', '') || 
             3000;

const BASE_URL = `http://localhost:${PORT}/api`;
const SERVER_URL = `http://localhost:${PORT}`;

// Define test functions
async function testGetAllPlaces() {
  console.log('\n--- Testing GET /places ---');
  try {
    const response = await fetch(`${BASE_URL}/places`);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    return data.success;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

async function testGetPlaceById(id) {
  console.log(`\n--- Testing GET /places/${id} ---`);
  try {
    const response = await fetch(`${BASE_URL}/places/${id}`);
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    return data.success;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

async function testGetAvailableWorkers(placeId) {
  console.log(`\n--- Testing POST /workers/available (placeId: ${placeId}) ---`);
  try {
    const response = await fetch(`${BASE_URL}/workers/available`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    return data.success;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

async function testSelectWorker(workerId) {
  console.log(`\n--- Testing POST /workers/select (workerId: ${workerId}) ---`);
  try {
    const response = await fetch(`${BASE_URL}/workers/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerId })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    return data.success;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

async function testInvalidWorker() {
  console.log('\n--- Testing POST /workers/select with invalid workerId ---');
  try {
    const response = await fetch(`${BASE_URL}/workers/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workerId: 999 })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
    // This should return false because we expect the request to fail
    return !data.success;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

// Run the tests
async function runTests() {
  console.log('Starting API tests...');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Get all places
  if (await testGetAllPlaces()) {
    console.log('✅ Test passed');
    passed++;
  } else {
    console.log('❌ Test failed');
    failed++;
  }
  
  // Test 2: Get place by ID
  if (await testGetPlaceById(1)) {
    console.log('✅ Test passed');
    passed++;
  } else {
    console.log('❌ Test failed');
    failed++;
  }
  
  // Test 3: Get available workers for place
  if (await testGetAvailableWorkers(2)) {
    console.log('✅ Test passed');
    passed++;
  } else {
    console.log('❌ Test failed');
    failed++;
  }
  
  // Test 4: Select a worker
  if (await testSelectWorker(3)) {
    console.log('✅ Test passed');
    passed++;
  } else {
    console.log('❌ Test failed');
    failed++;
  }
  
  // Test 5: Try to select an invalid worker
  if (await testInvalidWorker()) {
    console.log('✅ Test passed');
    passed++;
  } else {
    console.log('❌ Test failed');
    failed++;
  }
  
  console.log(`\n--- Test Summary ---`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${passed + failed}`);
}

// Check if server is running before testing
(async () => {
  try {
    const response = await fetch(SERVER_URL);
    console.log(`Server is running on port ${PORT}. Starting tests...`);
    runTests();
  } catch (error) {
    // Try to detect server on different ports
    console.error(`Error: Server not found on port ${PORT}`);
    console.log('Trying to detect server on alternate ports...');
    
    // Try a few common alternative ports
    const alternatePorts = [3001, 3002, 3003, 8080, 8000];
    
    for (const altPort of alternatePorts) {
      try {
        const response = await fetch(`http://localhost:${altPort}`);
        console.log(`Server found on port ${altPort}!`);
        console.log(`Please restart tests with: npm test -- --port=${altPort}`);
        process.exit(0);
      } catch (e) {
        // Continue trying other ports
      }
    }
    
    console.error('Could not find running server on any common ports.');
    console.error('Please start the server with: npm start');
    console.error('If using a custom port, run tests with: npm test -- --port=YOUR_PORT');
    process.exit(1);
  }
})();
