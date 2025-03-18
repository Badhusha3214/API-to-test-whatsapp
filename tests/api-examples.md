# API Testing Examples

## Prerequisites
- Make sure your server is running: `npm run dev` or `npm start`
- Use a tool like curl, Postman, Insomnia, or any API testing tool
- The server should be running on http://localhost:3000

## GET - List all places
### Request
```bash
curl http://localhost:3000/api/places
```

### Expected Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Downtown Office",
      "address": "123 Main St, Downtown",
      "location": { "lat": 40.7128, "lng": -74.0060 }
    },
    {
      "id": 2,
      "name": "North Shopping Mall",
      "address": "456 North Ave, Uptown",
      "location": { "lat": 40.7580, "lng": -73.9855 }
    },
    {
      "id": 3,
      "name": "West Industrial Park",
      "address": "789 West Blvd, Westside",
      "location": { "lat": 40.7488, "lng": -74.0353 }
    }
  ]
}
```

## GET - Specific place by ID
### Request
```bash
curl http://localhost:3000/api/places/1
```

### Expected Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Downtown Office",
    "address": "123 Main St, Downtown",
    "location": { "lat": 40.7128, "lng": -74.0060 }
  }
}
```

## POST - Get available workers for a place
### Request
```bash
curl -X POST http://localhost:3000/api/workers/available \
  -H "Content-Type: application/json" \
  -d '{"placeId": 1}'
```

### Expected Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "phone": "+11234567890",
      "placeId": 1,
      "available": true,
      "location": "Downtown Office"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "phone": "+10987654321",
      "placeId": 1,
      "available": true,
      "location": "Downtown Office"
    }
  ]
}
```

## POST - Select a worker and get their contact information
### Request
```bash
curl -X POST http://localhost:3000/api/workers/select \
  -H "Content-Type: application/json" \
  -d '{"workerId": 1}'
```

### Expected Response
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "phone": "+11234567890",
    "location": "Downtown Office"
  },
  "message": "Worker has been notified via WhatsApp"
}
```

## Error Cases

### 1. Invalid placeId
#### Request
```bash
curl -X POST http://localhost:3000/api/workers/available \
  -H "Content-Type: application/json" \
  -d '{"placeId": 999}'
```

#### Expected Response
```json
{
  "success": true,
  "data": []
}
```

### 2. Missing workerId
#### Request
```bash
curl -X POST http://localhost:3000/api/workers/select \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### Expected Response
```json
{
  "success": false,
  "message": "Please provide a worker ID"
}
```

### 3. Invalid workerId
#### Request
```bash
curl -X POST http://localhost:3000/api/workers/select \
  -H "Content-Type: application/json" \
  -d '{"workerId": 999}'
```

#### Expected Response
```json
{
  "success": false,
  "message": "Worker not found"
}
```

## JavaScript Fetch Examples

### Get all places
```javascript
fetch('http://localhost:3000/api/places')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Get available workers
```javascript
fetch('http://localhost:3000/api/workers/available', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ placeId: 2 }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Select a worker
```javascript
fetch('http://localhost:3000/api/workers/select', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ workerId: 3 }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
