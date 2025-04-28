const notFound = (req, res, next) => {
  res.status(404).send(`Not Found URL:${req.originalUrl}`);
};
module.exports = notFound;
