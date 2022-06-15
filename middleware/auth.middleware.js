const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");


const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Bearer ";

      if (!authHeader || !authHeader.startsWith(bearer)) {
        res.status(200).send({
          message: "Access denied. No credentials sent!",
          status: 401,
          data: null,
        });
      }

      const token = authHeader.replace(bearer, "");
      const secretKey =process.env.SECRET_JWT;

      // Verify Token
      const decoded = jwt.verify(token, secretKey);
      const user = await UserModel.findOne({ id: decoded.Id });

      if (!user) {
        res.status(200).send({
          message: "Authentication failed!",
          status: 401,
          data: null,
        });
      }
     
      req.currentUser = user

      next();
    } catch (e) {
      // e.status = 401;
      // next(e);
      res.status(200).send({
        message: e.message,
        status: 401,
        data: null,
      });
    }
  };
};

module.exports = auth;
