const express = require("express");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const connectDB = require("./db/connectDB");
const dotenv = require("dotenv");

dotenv.config();

const authRoute = require("./routes/authRoutes");
const notFound = require("./middleware/notFound");

const app = express();

connectDB();

app.use(express.json());

const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// create session middleware
app.use(
  session({
    name: "sessionID",
    secret: process.env.SESSIONID,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/", authRoute);

app.use(notFound);

const port = 3000;

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => {
    process.exit(1);
  });
});
