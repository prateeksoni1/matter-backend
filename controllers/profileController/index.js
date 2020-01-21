const Profile = require("../../models/Profile");
const User = require("../../models/User");

const getProfileByUsernameController = async (req, res) => {
  const { username } = req.params;
  try {
    const profile = await Profile.findOne({ username });
    if (profile) {
      return res.json({
        success: true,
        profile
      });
    }

    return res.json({
      success: false
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err
    });
  }
};

const getProfilesController = async (req, res) => {
  const { search } = req.query;
  try {
    let profiles = [];
    if (search) {
      profiles = await Profile.find({
        $or: [
          { name: { $regex: search } },
          { username: { $regex: search } },
          { email: { $regex: search } }
        ]
      });
    } else {
      profiles = await Profile.find();
    }

    return res.json({
      success: true,
      profiles
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false
    });
  }
};

const getProfileController = async (req, res) => {
  const profile = await Profile.findById(req.user.profile).populate({
    path: "projects",
    populate: { path: "contributors", populate: "profile" }
  });

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

const createProfileController = async (req, res) => {
  const { name, email, username, isOwner, organization } = req.body;
  const profile = await Profile.findById(req.user.profile);
  if (profile) {
    return res.json({
      success: false,
      error: {
        message: "Profile already exists"
      }
    });
  } else {
    const profileData = {
      uid: user.uid,
      name,
      email,
      username,
      isOwner,
      organization
    };

    const newProfile = new Profile(profileData);
    await newProfile.save();
    const user = await User.findById(req.user._id);
    user.profile = newProfile._id;
    await user.save();
    res.status(201).json({
      success: true,
      profile: newProfile
    });
  }
};

module.exports = {
  getProfileController,
  createProfileController,
  getProfileByUsernameController,
  getProfilesController
};
