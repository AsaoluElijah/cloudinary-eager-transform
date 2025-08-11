const express = require("express");
const app = express();
const { cloudinary, getWebhookUrl } = require("../config");

app.use(express.json());

// Webhook endpoint for when first eager transformations complete
app.post("/webhooks/eager-complete", async (req, res) => {
  console.log("Eager transformations completed!");
  //   console.log("Request body:", JSON.stringify(req.body, null, 2));

  const publicId = req.body.public_id;
  console.log(`Processing video with public_id: ${publicId}`);

  try {
    // Apply subtitles overlay to the processed video
    const result = await cloudinary.uploader.explicit(publicId, {
      resource_type: "video",
      type: "upload",
      eager: [
        {
          overlay: {
            resource_type: "subtitles",
            public_id: "subtitles/big-buck-bunny.vtt",
          },
          flags: "layer_apply",
          quality: "auto",
          bit_rate: "1200k",
          format: "mp4",
        },
      ],
      eager_async: true,
      eager_notification_url: getWebhookUrl("final-video"),
    });

    console.log("Subtitles overlay applied successfully");
    // console.log("Result:", JSON.stringify(result, null, 2));

    res.sendStatus(200);
  } catch (error) {
    console.error("Error applying subtitles overlay:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint for when final video processing complete
app.post("/webhooks/final-video", (req, res) => {
  console.log("Final video processing completed!");
  console.log("Request body:", JSON.stringify(req.body, null, 2));
  try {
    const finalUrl = req.body.eager[0]?.url;

    if (finalUrl) {
      console.log("Final video URL:", finalUrl);
      console.log("You can now push this URL to CMS, publish to queue, etc.");
    } else {
      console.log("No final URL found in the response");
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error calling final webhook:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(9090, () => {
  console.log(`Server is running on port http://localhost:9090`);
  console.log(`To start the video upload process, run: npm run upload`);
});
