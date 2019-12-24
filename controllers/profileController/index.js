const Profile = require("../../models/Profile");

const getProfileController = async (req, res) => {
  const { email } = req.params;
  const profile = await Profile.find({ email });
  if (!profile) {
    res.json({
      success: false,
      error: {
        message: "No profle found"
      }
    });
  } else {
    res.json({
      success: true,
      profile
    });
  }
};

module.exports = { getProfileController };
