const Profile = require("../../models/Profile");
const firebase = require("../../firebase");

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
  console.log("here");
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
    console.log(profiles);

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
  const user = firebase.auth().currentUser;
  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "No user logged in"
      }
    });
  }
  const profile = await Profile.findOne({ uid: user.uid });
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
  const { name, email, username } = req.body;
  const user = firebase.auth().currentUser;
  const profile = await Profile.findOne({ uid: user.uid });
  if (profile) {
    return res.json({
      success: false,
      error: {
        message: "Profile already exists"
      }
    });
  } else {
    const newProfile = new Profile({
      uid: user.uid,
      name,
      email,
      username
    });
    await newProfile.save();
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
