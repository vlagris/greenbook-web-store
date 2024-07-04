import bcrypt from "bcrypt";
import {userModel} from "../models/index.js";
import {errors} from "../constants.js";



export async function getUser(req, res) {
  try {
    const userId = req.userId;

    const user = await userModel.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] }
    });


    if (!user) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    res.status(200)
      .json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function updateUser(req, res) {
  try {
    const userId = req.userId;
    const firstName = req.body.firstName || null;
    const lastName = req.body.lastName || null;
    const avatarDeleted = req.body.avatar === "deleted";
    const avatarImageFIle = req.file;

    const user = await userModel.findByPk(
      userId,
      {
        attributes: {
          exclude: ["passwordHash"]
        }
      }
    );

    if (!user) {
      return res.status(400).json(errors.BAD_REQUEST);
    }


    const updateData = {firstName, lastName};

    if (avatarDeleted) {
      updateData.avatarImage = null;
    }

    if (avatarImageFIle) {
      updateData.avatarImage = req.protocol + '://' + req.get('host') + "/static/uploads/" + avatarImageFIle.filename;
    }


    const newUser = await user.update(updateData);


    res.status(200)
      .json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function updateEmail(req, res) {
  try {
    const userId = req.userId;
    const {email} = req.body;

    const isUseEmail = await userModel.findOne({ where: { email } });

    if (isUseEmail) {
      return res.status(400).json(errors.EMAIL_BUSY);
    }

    const user = await userModel.findByPk(
      userId,
      {
        attributes: {
          exclude: ["passwordHash"]
        }
      }
    );

    if (!user) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    console.log(email)

    const newUser = await user.update({ email });

    res.status(200)
      .json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function updatePassword(req, res) {
  try {
    const userId = req.userId;
    const {currentPassword, newPassword} = req.body;

    const user = await userModel.findByPk(userId);

    if (!user) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    const isValidPass = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json(errors.INVALID_DATA);
    }

    const salt = await bcrypt.genSalt(11);
    const passwordHash = await bcrypt.hash(newPassword, salt);

   await user.update({ passwordHash });

    res.status(200)
      .json({
        // success: result
        success: true
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}
