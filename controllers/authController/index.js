const firebase = require("../../firebase");

const checkAuthStatusController = async (req, res, next) => {
  const user = firebase.auth().currentUser;
  if (user) return next();
  return res.status(403).json({
    success: false,
    message: "No user logged in"
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

const logoutController = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  checkAuthStatusController
};
