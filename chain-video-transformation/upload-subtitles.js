const { cloudinary } = require("../config");
const path = require("path");

async function uploadSubtitles() {
  try {
    const subtitlePath = path.join(__dirname, "big-buck-bunny.vtt");

    const result = await cloudinary.uploader.upload(subtitlePath, {
      resource_type: "raw",
      public_id: "subtitles/big-buck-bunny",
      overwrite: true,
    });

    console.log("Subtitle file uploaded successfully!");
  } catch (error) {
    console.error("Error uploading subtitle file:", error);
    process.exit(1);
  }
}

uploadSubtitles();
