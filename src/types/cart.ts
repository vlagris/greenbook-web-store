import {EntityState} from "@reduxjs/toolkit";
import {Book, BookResponse} from "@/types";


export type CartItem = Pick<Book, "id" | "title" | "price" | "image"> & {
  quantity: number
}

export type Cart = {
  items: CartItem[],
  totalQuantity: number,
}

export type CartState = Omit<Cart, "items"> & {
  items: EntityState<CartItem, string>,
  isLoading: boolean,
  isSuccess: boolean
}


export type CartItemResponse = BookResponse & {
  quantity: number
};

export type CartItemRequest = {
  bookId: string,
  quantity: number
};
export type CartResponse = {
  Books: CartItemResponse[]
};

export type CartRequest = CartItemRequest[];


export type UpdateCartItem = {
  id: string,
  quantity: number
}

export type AddToCart = {
  id: string,
  quantity: number
}[]