require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const {
  authRouter,
  profileRouter,
  projectRouter,
  organizationRouter
} = require("./routes");

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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/project", projectRouter);
app.use("/api/organization", organizationRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
