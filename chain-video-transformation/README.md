# Chain Video Transformation

Upload a video to Cloudinary, apply transformations, and process results through webhooks.

## Setup

1. **Update Cloudinary credentials in `config.js`:**
   - Open `../config.js`
   - Replace `cloud_name`, `api_key`, and `api_secret` with your Cloudinary credentials
   - Update the ngrok URL in `getWebhookUrl()` function if needed

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Upload subtitle file:**
   ```bash
   npm run upload-subtitles
   ```

4. **Start webhook server:**
   ```bash
   npm start
   ```

5. **Upload video (in new terminal):**
   ```bash
   npm run upload
   ```

## What It Does

1. **Uploads** your video with initial transformations
2. **Applies** subtitle overlay when first transformations complete
3. **Logs** the final video URL when everything is done

## Files

- `index.js` - Main script that uploads video and triggers the webhook chain
- `server.js` - Webhook server that receives and processes transformation completion notifications
- `big-buck-bunny.vtt` - Subtitle file in WebVTT format for video overlay
- `sample.mp4` - Sample video file for testing the transformation chain

## Commands

- `npm start` - Start webhook server
- `npm run upload` - Upload and process video
- `npm run upload-subtitles` - Upload subtitle file to Cloudinary
