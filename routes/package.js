const express = require("express");
const {
  createPackage,
  getPackageByTracking,
  addPackageDetails,
} = require("../handlers/package-handler");
const router = express.Router();

router.route("/").post(createPackage);
router.route("/:tracking").get(getPackageByTracking);
router.route("/:id").put(addPackageDetails);

module.exports = router;
