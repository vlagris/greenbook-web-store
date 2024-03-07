import CartModel, {CartItemModel} from "../models/cart.js";
import {errors} from "../constants.js";
// import BookModel from "../models/book.js";


export async function getCart(req, res) {
  try {
    const cart = await CartModel.findOne({
      userId: req.userId
    }).populate("items.bookId");

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}

export async function createCart(req, res) {
  try {
    const userId = req.userId;
    const cartItems = req.body.items || [];

    const doc = new CartModel({
      userId: userId,
      items: []
    });

    cartItems.forEach(cartItem => {
      const cartItemDoc = new CartItemModel(cartItem);
      doc.items.push(cartItemDoc);
    })

    const cart = await doc.save();

    res.json("cart");
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}

export async function addItem(req, res) {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    // const book = await BookModel.findById(bookId);

    const cartItem = new CartItemModel({
      bookId: bookId,
      quantity: 1
    });

    await CartModel.updateOne(
      {
        userId: req.userId
      },
      {
        $push: {
          items: cartItem
        }
      }
    );

    const cart = await CartModel.findOne({
      userId: req.userId,
    }, {
        items: {
          $elemMatch: {
            bookId: bookId
          }
      }
    }).populate("items.bookId");


    console.log(cart._doc.items[0]);


    res.status(200).json(cart._doc.items[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}


export async function updateItem(req, res) {
  try {
    const bookId = req.params.id;
    const quantity = req.body.quantity;

    if (!bookId || !quantity) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    await CartModel.updateOne({
      userId: req.userId,
      "items.bookId": bookId
    }, {
      "$set": {
        "items.$.quantity": quantity
      }
    });


    const cart = await CartModel.findOne({
      userId: req.userId,
    }, {
      items: {
        $elemMatch: {
          bookId: bookId
        }
      }
    }).populate("items.bookId");


    const cartItem = cart.items[0];

    if (!cartItem) {
      res.status(400).json({
        message: "Item not found"
      });
    }

  res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json(errors.SERVER_ERROR);
  }
}


export async function removeItem(req, res) {
  try {
    const bookId = req.params.id;

    if (!bookId) {
      return res.status(400).json(errors.BAD_REQUEST);
    }

    const cart = await CartModel.findOne({userId: req.userId});

    cart.items.forEach((item, index) => {
      if (item.bookId.toString() === bookId) {
        cart.items.splice(index, 1);
      }
    });


    await cart.save();


    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).json(errors.SERVER_ERROR);
  }
}