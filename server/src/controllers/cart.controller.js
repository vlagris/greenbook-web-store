import {errors} from "../constants.js";
import {bookModel, cartModel, cartItemModel} from "../models/index.js";


export async function getCart(req, res) {
  try {
    const cart = await cartModel.findOne({
      where: { userId: req.userId },
      include: {
        model: bookModel,
        through: {
          attributes: ['quantity'],
          as: 'itemQuantity'
        }
      }
    });

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}


export async function createCart(req, res) {
  try {
    const userId = req.userId;
    const cartItemsData = req.body || [];


     const emptyCart = await cartModel.create(
      { userId: userId }
    );


    const cartItems = cartItemsData.map(item => {
      return {
        bookId: item.bookId,
        cartId: emptyCart.id,
        quantity: item.quantity,
      }
    })


    await cartItemModel.bulkCreate(cartItems);


    const cart = await cartModel.findOne({
      where: { userId },
      include: {
        model: bookModel,
        through: {
          attributes: ['quantity'],
          as: 'itemQuantity'
        }
      }
    });


    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}

export async function addItem(req, res) {
  try {
    const userId = req.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    const cart = await cartModel.findOne({ where: { userId } });

    const cartItem = await cartItemModel.findOne({
      where: {
        bookId: bookId,
        cartId: cart.id,
      }
    });


    if (cartItem) {
      await cartItemModel.update({
        quantity: cartItem.quantity + 1
      }, {
        where: {
          bookId: bookId,
          cartId: cart.id,
        }
      });
    } else {
      await cartItemModel.create({
        cartId: cart.id,
        bookId: bookId
      });
    }


    const newCartItem = await cartItemModel.findOne({
      where: {
        bookId: bookId,
        cartId: cart.id,
      }
    });

    res.status(200).json(newCartItem);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}


export async function updateItem(req, res) {
  try {
    const userId = req.userId;
    const bookId = req.body.id;
    const quantity = req.body.quantity;

    if (!bookId || !quantity) {
      return res.status(400).json(errors.BAD_REQUEST);
    }


    const cart = await cartModel.findOne({
      where: { userId },
      include: {
        model: bookModel,
        where: { id: bookId },
      }
    });


    if (!cart) {
      return res.status(400).json({
        message: "Item not found"
      });
    }


    await cartItemModel.update({
      quantity
    }, {
      where: {
        bookId: bookId,
        cartId: cart.id,
      }
    });


    const cartItem = await cartItemModel.findOne({
      where: {
        bookId: bookId,
        cartId: cart.id,
      }
    });


  res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json(errors.SERVER_ERROR);
  }
}


export async function removeItem(req, res) {
  try {
    const userId = req.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json(errors.BAD_REQUEST);
    }


    const cart = await cartModel.findOne({
      where: { userId },
      include: {
        model: bookModel,
        where: { id: bookId },
      }
    });


    if (!cart) {
      return res.status(400).json({
        message: "Item not found"
      });
    }


    await cartItemModel.destroy({
      where: {
        bookId: bookId,
        cartId: cart.id,
      }
    });


    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}