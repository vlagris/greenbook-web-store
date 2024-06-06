import booksData from "@/server-imitation/db/books.json";
import {errors} from "../constants.js";
import {nanoid} from "nanoid";
import {Cart, CartItem} from "@/server-imitation/types.ts";


export function getCart(req: any) {
  const userId = req.userId;

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }


  const carts = localStorage.getItem("cartsData") || "[]";

  const cart = JSON.parse(carts).find((item: any) => item.userId === userId);


  cart.Books = cart.items.map((item: any) => {
    const book = booksData.find(bookData => bookData.id == item.bookId);
    if (!book) {
      return;
    }
    return {
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
      itemQuantity: {
        quantity: item.quantity
      }
    }
  })


  return {
    status: 200,
    data: cart
  }
}


export function createCart(req: any) {
  const userId = req.userId;
  const cartItemsData = req.body || [];

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }


  const cartItems = cartItemsData.map((item: any): CartItem => {
    return {
      bookId: item.bookId,
      quantity: item.quantity
    }
  })


  let cart: Cart = {
    id: nanoid(),
    userId: userId,
    items: cartItems
  };

  const carts = JSON.parse(localStorage.getItem("cartsData") || "[]");

  carts.push(cart);

  localStorage.setItem("cartsData", JSON.stringify(carts));

  return {
    status: 200,
    data: cart
  }
}

export function addItem(req: any) {
  const userId = req.userId;
  const bookId = req.params?.id;


  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  if (!bookId) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  const carts: Cart[] = JSON.parse(localStorage.getItem("cartsData") || "[]");

  let cartItem: CartItem | null = null;

  const newCarts = carts.map(cart => {
    if (cart.userId !== userId) {
      return cart;
    }

    const isItemExists = cart.items.some(item => item.bookId === bookId);

    if (!isItemExists) {
      const newCartItem = { bookId, quantity: 1 }
      cart.items.push(newCartItem);
      cartItem = newCartItem;
    }
    return cart;
  });

  if (!cartItem) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  localStorage.setItem("cartsData", JSON.stringify(newCarts));


  return {
    status: 200,
    data: cartItem
  }
}


export function updateItem(req: any) {
  const userId = req.userId;
  const bookId = Number(req.body.id) || null;
  const quantity = req.body.quantity;


  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  if (!bookId || !quantity) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  const carts: Cart[] = JSON.parse(localStorage.getItem("cartsData") || "[]");

  let cartItem: CartItem | null = null;

  const newCarts = carts.map(cart => {
    if (cart.userId !== userId) {
      return cart;
    }
    cart.items = cart.items.map(item => {
      // @ts-ignore
      if (item.bookId === bookId) {
        item.quantity = quantity;
        cartItem = item;
        return item;
      }
      return item;
    });
    return cart
  })

  if (!cartItem) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  localStorage.setItem("cartsData", JSON.stringify(newCarts));


  return {
    status: 200,
    data: cartItem
  }
}


export function removeItem(req: any) {
  const userId = req.userId;
  const bookId = req.params.id;

  if (!userId) {
    return {
      status: 403,
      data: errors.NOT_AUTH
    }
  }

  if (!bookId) {
    return {
      status: 400,
      data: errors.BAD_REQUEST
    }
  }

  const carts: Cart[] = JSON.parse(localStorage.getItem("cartsData") || "[]");


  const newCarts = carts.map(cart => {
    if (cart.userId !== userId) {
      return cart;
    }
    cart.items = cart.items.filter(item => item.bookId !== bookId);
    return cart;
  })

  localStorage.setItem("cartsData", JSON.stringify(newCarts));


  return {
    status: 200,
  }
}