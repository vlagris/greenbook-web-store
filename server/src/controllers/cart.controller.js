import {errors} from "../constants.js";
import {bookModel, cartModel, cartItemModel} from "../models/index.js";
import {Sequelize} from "sequelize";


export async function getCart(req, res) {
  try {
    const userId = req.userId;

    const cart = await cartModel.findOne({
      where: { userId: userId },
      include: {
        model: bookModel,
        through: {
          attributes: [],
          as: 'cartItem'
        },
        attributes: {
          include: [[Sequelize.literal('`Books->cartItem`.`quantity`'), 'quantity']]
        }
      }
    });

    console.log(JSON.stringify(cart));

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function addToCart(req, res) {
  try {
    const userId = req.userId;
    const items = req.body;


    if (!items) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    let cart = await cartModel.findOne({ where: { userId } });


    if (!cart) {
      cart = await cartModel.create({ userId: userId });
    }


    const cartItems = items.map(item => {
      return {
        bookId: item.id,
        cartId: cart.id,
        quantity: item.quantity,
      }
    })


    await cartItemModel.bulkCreate(cartItems, {
      updateOnDuplicate: ["quantity"]
    });


    const newCart = await cartModel.findOne({
      where: { userId },
      include: {
        model: bookModel,
        through: {
          attributes: [],
          as: 'cartItem'
        },
        attributes: {
          include: [[Sequelize.literal('`Books->cartItem`.`quantity`'), 'quantity']]
        }
      }
    });


    res.status(200).json(newCart);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}



export async function removeFromCart(req, res) {
  try {
    const userId = req.userId;
    const booksIds = req.query.ids;

    if (!booksIds.length) {
      return res.status(400).json(errors.BAD_REQUEST);
    }


    const cart = await cartModel.findOne({
      where: { userId }
    });


    if (!cart) {
      return res.status(400).json({
        message: "Item not found"
      });
    }


    await cartItemModel.destroy({
      where: {
        bookId: booksIds,
        cartId: cart.id,
      }
    });


    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}