import jwt from "jsonwebtoken";
import {errors} from "../constants.js";


function checkAuth(req, res, next) {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (!token) {
    return res.status(403).json(errors.NOT_AUTH);
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decode) => {
    if (err) {
      return res.status(403).json(errors.NOT_AUTH);
    }
    req.userId = decode.id;
    next();
  });
}

export default checkAuth;