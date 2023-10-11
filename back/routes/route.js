const express = require("express");
const router = express.Router();
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", upload.array("files"), (req, res) => {
  // Handle file uploads here
  const files = req.files;
  // Process the uploaded files and send a response
  res.json({ message: "Files uploaded successfully", files });
});

module.exports = router;
