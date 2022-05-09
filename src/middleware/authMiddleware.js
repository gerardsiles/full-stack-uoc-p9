const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const user = require("../controllers/usuarioController");
var cookieParser = require("cookie-parser");

const protect = asyncHandler(async (req, res, next) => {
  let username = req.cookies.username;
  console.log(username);

  if (!username) {
    res.render("login");
  }
  next();
});

module.exports = { protect };
