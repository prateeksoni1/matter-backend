const User = require("../../models/User");
const bcrypt = require("bcrypt");
const passport = require("../../passport-config");

const registerController = async (req, res) => {
  const { email, password } = req.body;
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

  res.status(201).json({
    success: true,
    user: registeredUser
  });
};

const loginController = (req, res) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({
        success: true,
        user
      });
    });
  })(req, res, next);
};

module.exports = { registerController, loginController };
