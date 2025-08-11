const { cloudinary, getWebhookUrl } = require("../config");
const path = require("path");

async function uploadVideo() {
  try {
    console.log("Starting video upload process...");

    const videoPath = path.join(__dirname, "sample.mp4");

    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: "video",
      eager: [
        {
          quality: "auto",
          bit_rate: "1200k",
          format: "mp4",
        },
        {
          width: 320,
          height: 180,
          crop: "fill",
          gravity: "auto",
          format: "jpg",
        },
      ],
      eager_async: true,
      eager_notification_url: getWebhookUrl("eager-complete"),
    });

    console.log("Video uploaded successfully!");
    // console.log("Upload result:", JSON.stringify(result, null, 2));
    console.log("Check your server logs to see the webhook chain in action!");
  } catch (error) {
    console.error("Error uploading video:", error);
    process.exit(1);
  }
}

uploadVideo();
