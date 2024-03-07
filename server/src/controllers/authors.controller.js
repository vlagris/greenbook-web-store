import AuthorModel from "../models/author.js";
import {errors} from "../constants.js";


export async function getAll(req, res) {
  try {
    const categories = await AuthorModel.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json(errors.SERVER_ERROR);
  }
}