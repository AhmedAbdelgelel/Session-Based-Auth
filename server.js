const express = require("express");

const authRoute = require("./routes/authRoutes");
const notFound = require("./middleware/notFound");

const app = express();

app.use(express.json());

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
