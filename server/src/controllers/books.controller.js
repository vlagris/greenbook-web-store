import {errors} from "../constants.js";
import {bookModel, genreModel, authorModel} from "../models/index.js";

export async function getByGenre(req, res) {
  try {
    const skip = req.query.offset || 0;
    const limit = req.query.limit || 15;
    const genrePathName = req.query.pathName;

    if(!genrePathName) {
      return res.status(404).json(errors.BAD_REQUEST);
    }


    const {count, rows: books} = await bookModel.findAndCountAll({
      limit: limit,
      offset: skip,
      include: [
        {
          model: authorModel,
          attributes: ["id", "name", "pathName"],
          through: { attributes: [] }
        },
        {
          where: { pathName: genrePathName },
          model: genreModel,
          attributes: ["id", "name", "pathName"],
          through: { attributes: [] }
        },
      ],
    })

    if(!books) {
      return res.status(404).json(errors.BAD_REQUEST);
    }

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

    const books = await bookModel.findAll({
      limit: limit,
      include: [
        {
          model: authorModel,
          attributes: ["id", "name", "pathName"],
          through: { attributes: [] }
        },
        {
          model: genreModel,
          attributes: ["id", "name", "pathName"],
          through: { attributes: [] }
        },
      ],
    })


    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}