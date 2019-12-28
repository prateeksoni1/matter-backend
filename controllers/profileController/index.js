const ProfileUser = require("../../models/ProfileUser");
const ProfileEmployer = require("../../models/ProfileEmployer");
const ProfileCollection = require("../../models/ProfileUser").collection;
const firebase = require("../../firebase");

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
  const profile = await ProfileCollection.findOne({ uid: user.uid });
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
  const { name, email, username, organizationName } = req.body;
  const user = firebase.auth().currentUser;
  const profile = await ProfileCollection.findOne({ uid: user.uid });
  if (profile) {
    return res.json({
      success: false,
      error: {
        message: "Profile already exists"
      }
    });
  } else {
    let newProfile = {
      uid: user.uid,
      name,
      email,
      username
    };
    let createdProfile = null;
    if (!organizationName) {
      createdProfile = new ProfileUser(newProfile);
    } else {
      newProfile.organizationName = organizationName;
      createdProfile = new ProfileEmployer(newProfile);
    }
    await createdProfile.save();
    res.status(201).json({
      success: true,
      profile: createdProfile
    });
  }
};

module.exports = { getProfileController, createProfileController };
