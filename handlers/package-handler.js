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
  const { timestamp, datestamp, description, location } = req.body;
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Bad request!" });

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
    foundPackage.details.push(newDetails);
    await foundPackage.save();
    res.status(200).json("Package details updated successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occured. Please try agin later.");
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

module.exports = { createPackage, getPackageByTracking, addPackageDetails }; //
