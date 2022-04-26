const asyncHandler = require("./asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  if (req.session.username == null) {
    console.log(req.session);
    return res.redirect("login");
  }
  next();
});

module.exports = { protect };
