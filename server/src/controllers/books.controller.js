import BookModel from "../models/book.js";
import GenreModel from "../models/genre.js";
import {errors} from "../constants.js";

export async function getByGenre(req, res) {
  try {
    const skip = req.query.offset || 0;
    const limit = req.query.limit;
    const genrePathName = req.query.pathName;

    if(!genrePathName) {
      return res.status(404).json(errors.BAD_REQUEST);
    }

    const genre = await GenreModel.findOne({pathName: genrePathName});

    if(!genre) {
      return res.status(404).json(errors.BAD_REQUEST);
    }

    const genreId = genre._id;
    const books = await BookModel.find({genres: genreId}, null, {skip, limit});
    const count = await BookModel.countDocuments({genres: genreId});


    res.status(200).json({
      items: books,
      totalItems: count
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}

export async function getRecommended(req, res) {
  try {
    const limit = req.query.limit || 50;

    const books = await BookModel.find({}, null, {limit});

    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}