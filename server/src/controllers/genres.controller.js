import GenreModel from "../models/genre.js";
import {errors} from "../constants.js";


export async function getAll(req, res) {
  try {
    const categories = await GenreModel.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json(errors.SERVER_ERROR);
  }
}