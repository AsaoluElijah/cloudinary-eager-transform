# Bulk Ingestion with Transcoding

Upload multiple videos to Cloudinary with automatic transcoding and transformation processing.

## Setup

1. **Update Cloudinary credentials in `config.js`:**
   - Open `../config.js`
   - Replace `cloud_name`, `api_key`, and `api_secret` with your Cloudinary credentials
   - Update the ngrok URL in `getWebhookUrl()` function if needed

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start webhook server:**
   ```bash
   npm start
   ```

4. **Run bulk ingestion (in new terminal):**
   ```bash
   npm run ingest
   ```

## What It Does

1. **Processes** multiple video files in batch
2. **Uploads** each video with specified transformations
3. **Handles** transcoding completion through webhooks
4. **Logs** progress and final URLs for each processed video

## Files

- `index.js` - Main script that handles bulk video uploads and transformation processing
- `server.js` - Webhook server that receives transcoding completion notifications

## Commands

- `npm start` - Start webhook server
- `npm run ingest` - Run bulk video ingestion and processing 