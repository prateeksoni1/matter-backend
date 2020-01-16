const firebase = require("../../firebase");
const Organization = require("../../models/Organization");

const createOrganization = async (req, res) => {
  const { isOwner } = firebase.auth().currentUser;
  if (!isOwner) {
    return res.status(401).json({
      success: "false",
      message: "User unauthorized"
    });
  }

  const { name, permissions } = req.body;

  const existingOrganization = await Organization.findOne({ name });

  if (existingOrganization) {
    return res.status(409).json({
      success: false,
      message: "Organization already exists"
    });
  }

  const organization = new Organization({
    name,
    permissions
  });

  await organization.save();

  return res.status(201).json({
    success: true,
    message: "Organization created successfully",
    organization
  });
};

const getOrganizations = async (req, res) => {
  const { search } = req.query;
  const organizations = [];
  try {
    if (search) {
      organizations = await Organization.find({ name: { $regex: search } });
    } else {
      organizations = await Organization.find();
    }
    return res.status(200).json({
      success: true,
      organizations
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};

module.exports = { createOrganization, getOrganizations };
