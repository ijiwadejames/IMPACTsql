/** @format */

const jwt = require("jsonwebtoken");
const User = require("../model/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //get token header
    try {
      token = req.headers.authorization.split(" ")[1];

      //verify token

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //get user from token

      req.user = await User.findByPk(decoded.id);

      console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json("Unauthorized");
    }
  }
  if (!token) {
    res.status(401).json("unauthorized, no token");
  }
};

module.exports = {
  protect,
};
