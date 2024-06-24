import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {cookies, errors} from "../constants.js";
import {userModel, userSessionModel} from "../models/index.js";
import { generateTokens, getUserWithoutPasswordHash } from "../utils/index.js";



export async function signup(req, res) {
  try {
    // const email = req.body.email;
    // const password = req.body.password;
    const {email, password} = req.body;

    const isUseEmail = await userModel.findOne({ where: { email } });

    if (isUseEmail) {
      return res.status(400).json(errors.EMAIL_BUSY);
    }

    const salt = await bcrypt.genSalt(11);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      passwordHash
    });

    const {accessToken, refreshToken} = await generateTokens(user);
    const userWithoutPasswordHash = getUserWithoutPasswordHash(user);


    res.cookie(cookies.refreshToken.name, refreshToken, cookies.refreshToken.options)
      .status(200)
      .json({
        user: userWithoutPasswordHash,
        accessToken,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({ where: { email: email } });


    if (!user) {
      return res.status(400).json(errors.INVALID_DATA);
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json(errors.INVALID_DATA);
    }

    const {accessToken, refreshToken} = await generateTokens(user);
    const userWithoutPasswordHash = getUserWithoutPasswordHash(user);



    res.cookie(cookies.refreshToken.name, refreshToken, cookies.refreshToken.options)
      .status(200)
      .json({
        user: userWithoutPasswordHash,
        accessToken,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function logout(req, res) {
  try {
    res.cookie(cookies.refreshToken.name, "", cookies.refreshToken.options)
      .status(200)
      .json({
        success: false
      });
  } catch (err) {
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken || null;


    if (refreshToken === null) {
      return res.status(403).json(errors.INVALID_REFRESH_TOKEN);
    }


    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      (err, decode) => {
        if (err) {
          return null;
        }
        return decode;
      });


    if (!decoded) {
      return res.status(403).json(errors.INVALID_REFRESH_TOKEN);
    }


    const userSession = await userSessionModel.findOne({
      where: { token: refreshToken } ,
      include: {
        model: userModel,
      }
    });


    const user = userSession?.User || null;


    if (!userSession || !user) {
      return res.status(403).json(errors.INVALID_REFRESH_TOKEN);
    }


    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = await generateTokens(user);


    res.cookie(cookies.refreshToken.name, newRefreshToken, cookies.refreshToken.options)
      .status(200)
      .json({ accessToken: newAccessToken })

  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}

