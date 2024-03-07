import validator from 'validator';
import {errors} from "../constants.js";

export function registerValidator(req, res, next) {
  const email = req.body?.email;
  const password = req.body?.password;
  let error = false;

  if(!email || !password) {
    return res.status(400).json(errors.BAD_REQUEST);
  }

    if (!validator.isEmail(req.body?.email)) {
    error = true;
  }
  if (!validator.isLength(req.body?.password, { min: 8, max: 32 })) {
    error = true;
  }
  if (error) {
    return res.status(400).json(errors.NOT_VALIDATION);
  }
  next();
}

export function loginValidator(req, res, next) {
  const email = req.body?.email;
  const password = req.body?.password;
  let error = false;

  if(!email || !password) {
    return res.status(400).json(errors.BAD_REQUEST);
  }

  if (!validator.isEmail(req.body.email)) {
    error = true;
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    error = true;
  }

  if (error) {
    return res.status(400).json(errors.NOT_VALIDATION);
  }
  next();
}

