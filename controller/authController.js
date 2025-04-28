const uuid = require("uuid").v4;

// create session object in the memory
const sessions = {};

// @desc login user using sessionId
exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username === "admin" || !password === "admin") {
    return res.status(401).send("Invalid username or password");
  }
  const sessionId = uuid();
  sessions[sessionId] = { username, userId: 1 };
  res.set("Set-Cookie", `sessionId=${sessionId}`);
  res.status(200).json({
    message: "success",
  });
};

// @desc create test endpoint for testing session authentication
exports.testAuth = (req, res) => {
  const sessionId = req.headers.cookie?.split("=")[1];
  const userSession = sessions[sessionId];
  if (!userSession) {
    return res.status(401).send("Invalid session");
  }
  const userId = userSession.userId;
  res.status(200).json({
    message: "success",
    userId,
  });
};

// @desc clear the session and logout
exports.logout = (req, res) => {
  const sessionId = req.headers.cookie?.split("=")[1];

  delete sessions[sessionId];
  res.set(
    "Set-Cookie",
    `sessionId=; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; HttpOnly; SameSite=Strict`
  );
  res.status(200).json({
    message: "success",
  });
};
