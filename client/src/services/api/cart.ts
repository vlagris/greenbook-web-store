import { mainApi } from "@/services/api/mainApi.ts";
import { AddToCart, Cart, CartResponse } from "@/types";
import { createHttpError } from "@/utils/createHttpError.ts";
import { cartResponseAdapter } from "@/services/api/adapters";
import { serverApi } from "@/services/api/serverApi.ts";



export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  endpoints: cartEndpoints
} = serverApi.injectEndpoints({
  endpoints: (build) => ({

    getCart: build.query<Cart, void>({
      query: () => ({
        url: '/cart/',
        method: "get",
      }),
      transformResponse: (response: CartResponse) => cartResponseAdapter(response),
    }),

    addToCart: build.mutation<Cart, AddToCart>({
      query: () => ({
        url: '/cart/items',
        method: "post",
      }),
      transformResponse: (response: CartResponse) => cartResponseAdapter(response),
    }),

    removeFromCart: build.mutation<boolean, string[]>({
      query: (args) => ({
        url: '/cart/items',
        method: "delete",
        params: { ids: args }
      }),
      transformResponse: () => true,
    }),

  })
})



export async function getCart() {
  try {
    const res = await mainApi.get<CartResponse>('/cart/');
    return cartResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function createCart(requestData: CartItem[]) {
  try {
    const formattedRequestData = cartRequestAdapter(requestData);
    const res = await mainApi.post<CartResponse>('/cart/', formattedRequestData);
    return cartResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function addCartItem(requestData: string) {
  try {
    const res = await mainApi.post<CartItemResponse>(`/cart/${requestData}`);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function updateCartItem(requestData: UpdateCartItem) {
  try {
    const res = await mainApi.patch<CartItemResponse>(`/cart/`, requestData);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function removeCartItem(requestData: string) {
  try {
    const res = await mainApi.delete<CartItemResponse>(`/cart/${requestData}`);
    return cartItemResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}
