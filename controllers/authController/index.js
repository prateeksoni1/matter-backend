const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const getAuthStatusController = async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user.user);

    return res.status(200).json({
      success: true,
      user,
    });
  } else {
    return res.status(404).json({
      success: false,
    });
  }
};

const checkAuthStatusController = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "No token provided",
    });
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!verifyToken) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  console.log(verifyToken);

  req.user = verifyToken;

  next();
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

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found",
    });
  }

  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    success: true,
    user,
    token,
  });
};

module.exports = {
  registerController,
  loginController,
  checkAuthStatusController,
  getAuthStatusController,
};
