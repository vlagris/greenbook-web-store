import {errors} from "../constants.js";
import {genreModel} from "../models/index.js";


export async function getAll(req, res) {
  try {
    const categories = await genreModel.findAll();

    res.json(categories);
  } catch (err) {
    res.status(500).json(errors.SERVER_ERROR);
  }
}