const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          console.log(user);
          if (!user) {
            return done(null, false);
          } else {
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
              return done(null, false);
            }
            return done(null, user);
          }
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
