import {errors} from "../constants.js";
import {nanoid} from "nanoid";
import {db} from "@/server-imitation/db/indexedDB.ts";


export async function getCart(req: any) {
  const userId = req.userId;


  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }


  const cart = await db.getFromIndex("carts" , "userId", userId);
  const books = await db.getAll("books");


  const cartItems = cart.items.map((item: any) => {
    const book = books.find(book => book.id == item.bookId);
    if (book) {
      return {
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: item.quantity
      }
    }
  })


  cart.Books = cartItems[0]? cartItems : [];


  return {
    status: 200,
    data: cart
  }
}



export async function addToCart(req: any) {
  const userId = req.userId;
  const items = req.body;


  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  if (!items) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  let cart = await db.getFromIndex("carts", "userId", userId);

  if (!cart) {
    cart = {
      id: nanoid(),
      userId: userId,
      items: []
    }
    await db.add("carts", cart);
  }

  const newCartItems: any = {};

  cart.items.forEach((item: any) => {
    newCartItems[item.bookId] = item;
  })


  items.forEach((item: any) => {
    newCartItems[item.id] = {
      bookId: item.id,
      quantity: item.quantity
    };
  })


  cart.items = Object.values(newCartItems);

  await db.put("carts", cart);


  const books = await db.getAll("books");

  const cartItems = cart.items.map((item: any) => {
    const book = books.find(book => book.id == item.bookId);
    if (book) {
      return {
        id: book.id,
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: item.quantity
      }
    }
  })

  cart.Books = cartItems[0]? cartItems : [];


  return {
    status: 200,
    data: cart
  }
}



export async function removeFromCart(req: any) {
  const userId = req.userId;
  const booksIds = req.query.ids;

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  if (!booksIds.length) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  let cart = await db.getFromIndex("carts", "userId", userId);

  cart.items = cart.items.filter((item: any) => !booksIds.includes(item.bookId));


  await db.put("carts", cart);

  return {
    status: 200,
  }
}



