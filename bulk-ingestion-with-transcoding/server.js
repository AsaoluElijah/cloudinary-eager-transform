const express = require("express");
const { cloudinary } = require("../config");

const app = express();

const runModerationCheck = async (publicId, derived) => {
  const video = (derived || []).find((d) => d.format === "mp4");
  const duration = video?.duration || 0;
  console.log(`Moderation check for ${publicId}: duration ${duration}s`);
  return duration >= 5 && duration <= 600;
};

app.post("/webhooks/bulk-eager", async (req, res) => {
  const event = req.body;
  if (event.notification_type !== "eager" || event.status !== "success")
    return res.sendStatus(200);

  const { public_id: publicId, derived = [] } = event;

  const approved = await runModerationCheck(publicId, derived);

  if (!approved) {
    await cloudinary.uploader.add_tag(["quarantine"], [publicId], {
      resource_type: "video",
    });
    console.log("Quarantined:", publicId);
    return res.sendStatus(200);
  }

  await cloudinary.uploader.add_tag(["approved"], [publicId], {
    resource_type: "video",
  });

  console.log("Approved:", publicId);
  // do something with the approved video
  res.sendStatus(200);
});

app.listen(9090, () => {
  console.log(`Server is running on port http://localhost:9090`);
});
