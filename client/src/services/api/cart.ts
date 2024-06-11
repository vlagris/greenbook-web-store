import {mainApi} from "@/services/api/mainApi.ts";
import {BookResponse, Cart, CartItem, UpdateCartItem} from "@/types.ts";
import {createHttpError} from "@/utils/createHttpError.ts";


type CartItemResponse = BookResponse & {
  itemQuantity: {
    quantity: number
  }
};

type CartItemRequest = {
  bookId: string,
  quantity: number
};
type CartResponse = {
  Books: CartItemResponse[]
};

type CartRequest = CartItemRequest[];



function cartItemResponseAdapter(data: CartItemResponse): CartItem {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    image: data.image,
    quantity: data.itemQuantity.quantity
  }
}
function cartResponseAdapter(data: CartResponse): Cart {
  let totalQuantity = 0;
  const items = data.Books.map(item => {
    totalQuantity += item.itemQuantity.quantity;
    return cartItemResponseAdapter(item)
  });
  return {
    items,
    totalQuantity
  }
}


function cartRequestAdapter(data: CartItem[]): CartRequest {
  return data.map(item => ({
    bookId: item.id,
    quantity: item.quantity
  }));
}


export async function getCart() {
  try {
    const res = await mainApi.get<CartResponse>('/cart/');
    return cartResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}

export async function createCart(requestData: CartItem[]) {
  try {
    const formattedRequestData = cartRequestAdapter(requestData);
    const res = await mainApi.post<CartResponse>('/cart/', formattedRequestData);
    return cartResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}

export async function addCartItem(requestData: string) {
  try {
    const res = await mainApi.post<CartItemResponse>(`/cart/${requestData}`);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}

export async function removeCartItem(requestData: string) {
  try {
    const res = await mainApi.delete<CartItemResponse>(`/cart/${requestData}`);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}

export async function updateCartItem(requestData: UpdateCartItem) {
  try {
    const res = await mainApi.patch<CartItemResponse>(`/cart/`, requestData);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}
