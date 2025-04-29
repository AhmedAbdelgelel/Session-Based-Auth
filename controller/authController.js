const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

// @desc register user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    return res
      .status(400)
      .send("You must enter ur username and email and password");
  }
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(400).send("This email is already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({ username, email, password: hashedPassword });
  res.status(200).json({
    message: "success",
  });
};

// @desc login user using sessionId
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("please enter ur email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send("Invalid email or password please login again");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send("invalid email or password");
  }
  req.session.userId = user._id;
  req.session.email = user.email;
  req.session.loggedIn = true;

  res.status(200).json({
    message: "success",
    username: user.username,
  });
};

// @desc create test endpoint for testing session authentication
exports.testAuth = (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).send("Invalid session");
  }
  res.status(200).json({
    message: "success",
    userId: req.session.userId,
    username: req.session.username,
  });
};

// @desc clear the session and logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
  });
  res.clearCookie("sessionID");
  res.status(200).json({
    message: "success",
  });
};
