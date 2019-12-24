const firebase = require("../../firebase");

const authStatusController = (req, res) => {
  const user = firebase.auth().currentUser;
  if (user) {
    res.json({
      success: true,
      user
    });
  } else {
    res.json({
      success: false
    });
  }
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
