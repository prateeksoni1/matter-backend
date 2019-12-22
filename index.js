require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

const { authRouter } = require("./routes");
const initializePassport = require("./passport-config");

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

app.use(
  session({
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: MongoStore({ mongooseConnection: mongoose.connection })
  })
);

passport.initialize();
initializePassport(passport);
passport.session();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
