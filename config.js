const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "<YOUR_CLD_CLOUD>",
  api_key: "<YOUR_CLD_KEY>",
  api_secret: "<YOUR_CLD_SECRET>",
  secure: true,
});

function getWebhookUrl(endpoint) {
  // run `ngrok http 9090` and replace with ngrok url
  return `https://dc8c93068a05.ngrok-free.app/webhooks/${endpoint}`;
}

module.exports = {
  cloudinary,
  getWebhookUrl,
};
