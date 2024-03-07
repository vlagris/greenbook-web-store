import jwt from "jsonwebtoken";
import UserSessionModel from "../models/userSession.js";

export async function generateTokens(user) {
  // try {
    const payload = { id: user._id };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "60d",
      }
    );

    await UserSessionModel.deleteOne({
      userId: user._id
    });
    await new UserSessionModel({
      userId: user._id,
      token: refreshToken
    }).save();

    return {accessToken, refreshToken};

  // } catch (err) {
  //
  // }
}
