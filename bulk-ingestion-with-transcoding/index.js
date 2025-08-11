const { cloudinary, getWebhookUrl } = require("../config");
const path = require("path");

const sources = [
  "path/to/sample.mp4",
  "path/to/sample2.mp4",
  "path/to/sample3.mp4",
];

const eagerPresets = [
  {
    width: 1280,
    height: 720,
    crop: "limit",
    quality: "auto",
    bit_rate: "2500k",
    format: "mp4",
  }, // HD
  {
    width: 854,
    height: 480,
    crop: "limit",
    quality: "auto",
    bit_rate: "1200k",
    format: "mp4",
  }, // SD
  { width: 320, height: 180, crop: "fill", gravity: "auto", format: "jpg" }, // thumbnail
];

async function uploadBatch() {
  for (const src of sources) {
    await cloudinary.uploader.upload(src, {
      resource_type: "video",
      folder: "ingest/bulk",
      eager: eagerPresets,
      eager_async: true,
      eager_notification_url: getWebhookUrl("bulk-eager"),
    });
  }
}

uploadBatch().catch(console.error);
