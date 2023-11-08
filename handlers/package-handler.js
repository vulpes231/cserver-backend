const Package = require("../models/Package");
const { createTracking } = require("../utils/createTracking");

const createPackage = async (req, res) => {
  const { item, sender } = req.body;
  if (!item || !sender)
    return res.status(400).json({ message: "Invalid item or sender!" });

  const trackingNo = createTracking();

  try {
    const newPackage = {
      item: item,
      sender: sender,
      tracking: trackingNo,
    };

    const savePkg = await Package.create(newPackage);
    console.log(savePkg);

    res.status(201).json({ message: "Package created successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured. Please try again later" });
  }
};

const addPackageDetails = async (req, res) => {
  const { timestamp, datestamp, description, location, status } = req.body;
  const { id } = req.params;
  // const { status } = req.body;
  if (!id || !timestamp || !datestamp || !description || !location)
    return res.status(400).json({ message: "Bad request!" });

  try {
    const foundPackage = await Package.findOne({ _id: id }).exec();
    console.log(foundPackage);

    if (!foundPackage) res.status(404).json({ message: "Package not found!" });

    const newDetails = {
      timestamp: timestamp,
      datestamp: datestamp,
      description: description,
      location: location,
    };
    if (status) {
      foundPackage.status.push(status);
    }
    foundPackage.details.push(newDetails);
    await foundPackage.save();
    res.status(200).json("Package details updated successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured. Please try agin later.");
  }
};

const deletePackageDetails = async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Bad request!" });
  try {
    const foundPackageDetails = await Package.details
      .findOne({ _id: id })
      .exec();
    if (!foundPackageDetails)
      res.status(404).json({ message: "Package not found!" });

    await foundPackage.deleteOne();
    res.status(204).json({ message: "Package deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred. Try again later." });
  }
};

const getPackageByTracking = async (req, res) => {
  const { tracking } = req.params;

  console.log(tracking);
  if (!tracking || tracking === undefined)
    return res.status(400).json({ message: "Bad request!" });

  try {
    const pkg = await Package.findOne({ tracking: tracking }).lean().exec();

    if (!pkg) return res.status(404).json({ message: "Package not found!" });
    res.status(200).json(pkg);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const deletePackage = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Bad request!" });

  try {
    const foundPackage = await Package.findOne({ _id: id }).exec();
    console.log(foundPackage);

    if (!foundPackage) {
      return res.status(404).json({ message: "Package not found!" }); // Added 'return' here
    }

    await foundPackage.deleteOne();
    res.status(204).json({ message: "Package deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred. Try again later." });
  }
};

const getAllPackage = async (req, res) => {
  const packages = await Package.find();
  console.log(packages);
  res.status(200).json(packages);
};

module.exports = {
  createPackage,
  getPackageByTracking,
  addPackageDetails,
  getAllPackage,
  deletePackage,
  deletePackageDetails,
}; //
