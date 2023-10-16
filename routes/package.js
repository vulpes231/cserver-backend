const express = require("express");
const {
  createPackage,
  getPackageByTracking,
  addPackageDetails,
  getAllPackage,
  deletePackage,
} = require("../handlers/package-handler");
const router = express.Router();

router.route("/").get(getAllPackage).post(createPackage);
router.route("/:tracking").get(getPackageByTracking);
router.route("/:id").put(addPackageDetails).delete(deletePackage);

module.exports = router;
