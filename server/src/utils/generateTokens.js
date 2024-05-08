import jwt from "jsonwebtoken";
import userSessionModel from "../models/userSession.model.js";


export async function generateTokens(user) {
  const userId = user.id;
  const payload = { id: userId };

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

  const userSession = await userSessionModel.findOne({
    where: {
      userId: userId
    },
  });


  if (userSession) {
    await userSession.update({ token: refreshToken });
  } else {
    await userSessionModel.create({ token: refreshToken, userId: userId });
  }


  return {accessToken, refreshToken};
}
