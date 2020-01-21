const Organization = require("../../models/Organization");

const createOrganization = async (req, res) => {
  const { name, permissionMatrix } = req.body;

  const existingOrganization = await Organization.findOne({ name });

  if (existingOrganization) {
    return res.status(409).json({
      success: false,
      message: "Organization already exists"
    });
  }

  const organization = new Organization({
    name,
    permissionMatrix
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
  let organizations = [];
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
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};

module.exports = { createOrganization, getOrganizations };
