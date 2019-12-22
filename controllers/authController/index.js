const User = require("../../models/User");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email });
  if (user) {
    return res.status(403).json({
      success: false,
      error: {
        message: "Email already registered"
      }
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const registeredUser = await new User({
    email,
    password: hashedPassword
  }).save();

  res.json({
    success: true,
    user: registeredUser
  });
};

module.exports = { registerController };
