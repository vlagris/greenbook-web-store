import UserModel from "../models/user.js";
import { filterUser } from "../utils/index.js";
import {errors} from "../constants.js";


export async function getMe(req, res) {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json(errors.NOT_FOUND);
    }

    const userData = filterUser(user._doc);

    res.json({
      user: userData
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}