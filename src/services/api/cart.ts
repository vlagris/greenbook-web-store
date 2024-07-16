import { AddToCart, Cart, CartResponse } from "@/types";
import { cartResponseAdapter } from "@/services/api/adapters";
import { mainApi } from "@/services/api/mainApi.ts";



export const cartMainApi = mainApi.injectEndpoints({
  endpoints: (build) => ({

    getCart: build.query<Cart, void>({
      query: () => ({
        url: '/cart',
        method: "get",
      }),
      transformResponse: (response: CartResponse) => cartResponseAdapter(response),
    }),

    addToCart: build.mutation<Cart, AddToCart>({
      query: (args) => ({
        url: '/cart/items',
        method: "post",
        data: args
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

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  endpoints: cartEndpoints
} = cartMainApi;
