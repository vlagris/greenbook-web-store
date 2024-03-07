import {mainApi} from "@/services/api/mainApi.ts";
import {BookResponse, Cart, CartItem, UpdateCartItem} from "@/types.ts";


type CartItemResponse = {
  bookId: BookResponse,
  quantity: number
};

type CartItemRequest = {
  bookId: string,
  quantity: number
};

type CartResponse = {
  items: CartItemResponse[]
};

type CartRequest = {
  items: CartItemRequest[]
};


function cartItemResponseAdapter(data: CartItemResponse): CartItem {
  return {
    id: data.bookId._id,
    title: data.bookId.title,
    price: data.bookId.price,
    image: data.bookId.image,
    quantity: data.quantity
  }
}
function cartResponseAdapter(data: CartResponse): Cart {
  let totalQuantity = 0;
  const items = data.items.map(item => {
    totalQuantity += item.quantity;
    return cartItemResponseAdapter(item)
  });

  return {
    items,
    totalQuantity
  }
}


function cartRequestAdapter(data: CartItem[]): CartRequest {
  const items: CartItemRequest[] = data.map(item => ({
    bookId: item.id,
    quantity: item.quantity
  }));

  return { items };
}


export async function getCart() {
  try {
    const res = await mainApi.get<CartResponse>('/cart/');
    return cartResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function createCart(requestData: CartItem[]) {
  try {
    const formattedRequestData = cartRequestAdapter(requestData);
    const res = await mainApi.post<CartResponse>('/cart/', formattedRequestData);
    return cartResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function addCartItem(requestData: string) {
  try {
    const res = await mainApi.post<CartItemResponse>(`/cart/${requestData}`);
    console.log(res.data);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function removeCartItem(requestData: string) {
  try {
    const res = await mainApi.delete<CartItemResponse>(`/cart/${requestData}`);
    console.log(res.status);
    // return cartItemResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function updateCartItem(requestData: UpdateCartItem) {
  try {
    const res = await mainApi.patch<CartItemResponse>(`/cart/${requestData.id}`, {quantity: requestData.quantity});
    console.log(res.data);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
