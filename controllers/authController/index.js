const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const getAuthStatusController = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    return res.status(404).json({
      success: false,
    });
  }
};

const checkAuthStatusController = async (req, res, next) => {
  console.log(req.isAuthenticated(), req.user);
  if (req.isAuthenticated()) return next();
  return res.status(403).json({
    success: false,
    message: "No user logged in",
  });
};

const registerController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = new User({
    email,
    password: hashedPassword,
  });

  await createdUser.save();

  return res.status(201).json({
    success: true,
    user: createdUser,
  });
};

const loginController = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return res.status(500).json({ success: false, error: err });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    req.logIn(user, (err) => {
      console.log("48: ", user, err);
      if (err) return res.status(500).json({ success: false, error: err });
      console.log("50: ", req.isAuthenticated());
      return res.status(200).json({
        success: true,
        user,
      });
    });
  })(req, res, next);
};

const logoutController = (req, res) => {
  req.logout();
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  checkAuthStatusController,
  getAuthStatusController,
};
