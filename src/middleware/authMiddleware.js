const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../models/usuarioModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // recibir el token, split elimina el Bearer
      token = req.headers.authorization.split("")[1];
      //verrificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Recibir al usuario en el token
      req.user = await User.findByUsername(decoded.username).select(
        "-password"
      );
      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      throw new Error("Sin autorizacion");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Sin autorizacion, no hay token");
  }
});

module.exports = protect;
