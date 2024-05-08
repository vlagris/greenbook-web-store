import {errors} from "../constants.js";
import {bookModel, genreModel, authorModel} from "../models/index.js";
import {Op} from "sequelize";



const booksOrdersMap = {
  popular: [['rating_count', 'DESC']],
  new: [['createdAt', 'DESC']],
  price_desc: [['price', 'DESC']],
  price_asc: [['price', 'ASC']],
  rating: [['rating_rate', 'DESC']],
}

export async function getByGenre(req, res) {
  try {
    const skip = req.query.offset || 0;
    const limit = req.query.limit || 15;
    const genrePathName = req.query.pathName;
    const sort = booksOrdersMap[req.query.sort] || booksOrdersMap["popular"];
    const price = req.query.price?.split("-");


    if(!genrePathName) {
      return res.status(404).json(errors.BAD_REQUEST);
    }


    const where = {};
    if (price) {
      where.price = {
        [Op.between]: price
      }
    }


    const {count, rows: books} = await bookModel.findAndCountAll({
      limit: limit,
      offset: skip,
      order: sort,
      where: where,
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
    });


    if(!books) {
      return res.status(404).json(errors.BAD_REQUEST);
    }


    const maxPrice = await bookModel.max("price", {
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
    });


    const minPrice = await bookModel.min("price", {
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
    });


    res.status(200).json({
      items: books,
      total: count,
      maxPrice,
      minPrice
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