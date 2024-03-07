import jwt from "jsonwebtoken";
import UserTokenModel from "../models/userSession.js";
import {generateTokens} from "../utils/index.js";


export async function verifyTokens(req, res, next) {
  const accessToken = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  const refreshToken = req.cookies.refreshToken;
  let decoded = null;

  if (accessToken) {
    decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      (err, decode) => {
      if (err) {
        return null;
      }
      return decode;
    });
  }
  if (decoded || !refreshToken) {
    return next();
  }


  const userToken = await UserTokenModel.findOneAndDelete({ token: refreshToken }).populate("userId");
  const user = userToken.userId;

  if (!userToken || !user) {
    return next();
  }


  decoded = jwt.verify(userToken.token,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (err, decode) => {
    if (err) {
      return null;
    }
    return decode;
  });
  if (!decoded) {
    return next();
  }

  const {accessToken: newAccessToken, refreshToken: newRefreshToken} = generateTokens(user);

  req.userId = decoded.id;
  req.accessToken = newAccessToken;
  res.cookie("refreshToken", newRefreshToken, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 60)),
  });

  next();
}