const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../views/index.html");
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server unavailable. Try again" });
  }
});

module.exports = router;
