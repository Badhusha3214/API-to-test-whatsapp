# Deploying the WhatsApp API Backend

This document provides instructions for deploying your WhatsApp API backend to various hosting platforms.

## Pre-Deployment Checklist

1. Ensure all dependencies are in package.json
2. Make sure start script is configured in package.json
3. Set up environment variables (see below)

## Environment Variables

The following environment variables should be configured in your hosting platform:

- `PORT` - The port the server will listen on (usually set automatically by hosting providers)
- `NODE_ENV` - Set to "production" for deployed environments
- `WHATSAPP_API_KEY` - Your WhatsApp API key
- `WHATSAPP_API_SECRET` - Your WhatsApp API secret
- `WHATSAPP_PHONE_NUMBER` - Your WhatsApp business phone number

## Deployment Options

### Render.com

1. Create a new Web Service
2. Connect your GitHub repository
3. Set the Environment to Node
4. Set the Build Command to `npm install`
5. Set the Start Command to `node server.js`
6. Add the environment variables listed above
7. Deploy

### Heroku

1. Install Heroku CLI: `npm install -g heroku`
2. Login to Heroku: `heroku login`
3. Create a new Heroku app: `heroku create your-app-name`
4. Set environment variables:
   ```
   heroku config:set NODE_ENV=production
   heroku config:set WHATSAPP_API_KEY=your_api_key
   heroku config:set WHATSAPP_API_SECRET=your_api_secret
   heroku config:set WHATSAPP_PHONE_NUMBER=your_whatsapp_phone_number
   ```
5. Deploy: `git push heroku main`

### Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy
4. Set environment variables in the Vercel dashboard

## Troubleshooting 502 Bad Gateway Errors

If you encounter a 502 Bad Gateway error after deployment:

1. Check the application logs on your hosting platform
2. Ensure all required environment variables are set
3. Verify the application starts locally with `npm start`
4. Make sure the `start` script in package.json is correct
5. Check if the Node.js version is supported by your hosting provider
6. Look for uncaught errors in your application code

## Testing Your Deployment

After successful deployment, test your API with the following endpoints:

- GET `/` - Should return a health check response
- GET `/api/places` - Should return a list of places
- POST `/api/workers/available` - Should return available workers for a place

You can use the Thunder Client collection included in this project for testing.
