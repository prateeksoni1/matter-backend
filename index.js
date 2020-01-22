require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("./passport")(passport);

const {
  authRouter,
  profileRouter,
  projectRouter,
  organizationRouter,
  permissionsRouter
} = require("./routes");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
  })
);

app.use(cors({ credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-rmfjp.mongodb.net/test?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/project", projectRouter);
app.use("/api/organization", organizationRouter);
app.use("/api/permissions", permissionsRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
