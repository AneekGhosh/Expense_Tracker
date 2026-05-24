const errorhandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(400).json({
    status: "Failed",
    message: err.message || "Something went wrong",
  });
};

module.exports = errorhandler;
