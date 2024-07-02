import {Cart, CartItem, CartItemResponse, CartRequest, CartResponse} from "@/types";

export function cartItemResponseAdapter(data: CartItemResponse): CartItem {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    image: data.image,
    quantity: data.quantity
  }
}


export function cartResponseAdapter(data: CartResponse): Cart {
  let totalQuantity = 0;
  const items = data.Books.map(item => {
    totalQuantity += item.quantity;
    return cartItemResponseAdapter(item)
  });
  return {
    items,
    totalQuantity
  }
}


export function cartRequestAdapter(data: CartItem[]): CartRequest {
  return data.map(item => ({
    bookId: item.id,
    quantity: item.quantity
  }));
}