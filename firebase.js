const firebase = require("firebase");
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDtucf7rmvSZjjLyGtSuYcimb9sGNWXeY0",
  authDomain: "bugtracker-elite.firebaseapp.com",
  databaseURL: "https://bugtracker-elite.firebaseio.com",
  projectId: "bugtracker-elite",
  storageBucket: "bugtracker-elite.appspot.com",
  messagingSenderId: "858054476786",
  appId: "1:858054476786:web:f44741ec73234313cd616b",
  measurementId: "G-7E82LN6HSK"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
