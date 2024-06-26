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
    const authors = req.query.authors?.split(",");

    console.log(authors)

    if(!genrePathName) {
      return res.status(404).json(errors.BAD_REQUEST);
    }


    const optionsWhere = {};
    const AuthorsOptionsWhere = {};

    if (price) {
      optionsWhere.price = {
        [Op.between]: price
      }
    }

    if (authors) {
      AuthorsOptionsWhere.id = {
        [Op.or]: authors
      }
    }


    const books = await bookModel.findAll({
      limit: limit,
      offset: skip,
      order: sort,
      where: optionsWhere,
      include: [
        {
          model: authorModel,
          where: AuthorsOptionsWhere,
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


    res.status(200).json(books);
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



export async function getBooksFilters(req, res) {
  try {
    const genrePathName = req.query.pathName;
    const price = req.query.price?.split("-");
    const authors = req.query.authors?.split(",");


    if(!genrePathName) {
      return res.status(404).json(errors.BAD_REQUEST);
    }


    const priceOptionsWhere = {};
    const totalOptionsWhere = {};
    const authorsOptionsWhere = {
      "$Books.Genres.pathName$": genrePathName
    };


    if (price) {
      totalOptionsWhere.price = {
        [Op.between]: price
      };
      authorsOptionsWhere["$Books.price$"] = {
        [Op.between]: price
      };
    }


    if (authors) {
      const authorsWhere = {
        [Op.or]: authors
      }
      priceOptionsWhere["$Authors.id$"] = authorsWhere;
      totalOptionsWhere["$Authors.id$"] = authorsWhere;
    }


    const optionsInclude = [
      {
        model: authorModel,
        attributes: [],
        through: { attributes: [] }
      },
      {
        where: { pathName: genrePathName },
        model: genreModel,
        attributes: [],
        through: { attributes: [] }
      },
    ]


    const maxPrice = await bookModel.max("price", {
      where: priceOptionsWhere,
      include: optionsInclude,
    });

    const minPrice = await bookModel.min("price", {
      where: priceOptionsWhere,
      include: optionsInclude,
    });

    const totalCount = await bookModel.count({
      where: totalOptionsWhere,
      include: optionsInclude,
    });


    const authorsData = await authorModel.findAll({
      where: authorsOptionsWhere,
      attributes: ["id", "name"],
      include: {
        model: bookModel,
        attributes: [],
        through: { attributes: [] },
        include: {
          model: genreModel,
          attributes: [],
          through: { attributes: [] }
        }
      },
    });


    res.status(200).json({
      items: [
        {
          name: "Цены",
          key: "price",
          type: "range",
          minPrice,
          maxPrice,
        },
        {
          items: authorsData,
          name: "Авторы",
          key: "authors",
          type: "select",
          maxSelect: 10
        },
      ],
      total: totalCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}