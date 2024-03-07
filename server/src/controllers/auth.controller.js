import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import UserSessionModel from "../models/userSession.js";
import jwt from "jsonwebtoken";
import { generateTokens, filterUser } from "../utils/index.js";
import {errors} from "../constants.js";



export async function signup(req, res) {
  try {
    const isUseEmail = await UserModel.findOne({ email: req.body.email });
    if (isUseEmail) {
      return res.status(400).json(errors.EMAIL_BUSY);
    }

    const salt = await bcrypt.genSalt(11);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash,
    });
    const user = await doc.save();

    const userData = filterUser(user._doc);
    const {accessToken, refreshToken} = await generateTokens(user._doc);


    res
      .cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 60)),
      })
      .status(200)
      .json({
        user: userData,
        accessToken,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function login(req, res) {
  try {

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json(errors.INVALID_DATA);
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json(errors.INVALID_DATA);
    }

    const userData = filterUser(user._doc);
    const {accessToken, refreshToken} = await generateTokens(user._doc);


    res
      .cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 60)),
      })
      .status(200)
      .json({
        user: userData,
        accessToken,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function logout(req, res) {
  try {
    res.cookie("refreshToken", "", {
      expires: new Date(Date.now() + 1000),
    })
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
      return res.status(403).json(errors.NO_REFRESH_TOKEN);
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

    const userSession = await UserSessionModel.findOne({token: refreshToken}).populate("userId");
    const user = userSession?.userId || null;


    if (!userSession || !user) {
      return res.status(403).json(errors.INVALID_REFRESH_TOKEN);
    }



    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = await generateTokens(user);

    res.cookie("refreshToken", newRefreshToken, {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 60)),
      })
      .status(200)
      .json({
        accessToken: newAccessToken,
      })

  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}

