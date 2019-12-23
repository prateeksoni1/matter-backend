const User = require("../../models/User");
const firebase = require("../../firebase");

const authStatusController = (req, res) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      res.status(200).json({
        success: true,
        user
      });
    } else {
      res.status(404).json({
        success: false,
        error: "No user found"
      });
    }
  });
};

const registerController = async (req, res) => {
  const { email, password } = req.body;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      res.json({
        success: true,
        user
      });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

const loginController = (req, res) => {
  const { email, password } = req.body;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      res.json({
        success: true,
        user
      });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

module.exports = { registerController, loginController, authStatusController };
