import * as apiCart from "@/services/api/cart.ts";
import {getAsyncThunkCalls} from "@/utils/utilsForTests.tsx";
import {addCart, addCartFromStorage, fetchCart} from "@/store/cart";
import {cart, storeState} from "@/store/cart/__tests__/cartActions.test.ts";



describe('cart asyncThunk fetchCart', () => {
  it('should fetchCart with reject response', async () => {
    jest.spyOn(apiCart, "getCart").mockReturnValue(Promise.resolve(cart));
    const calls = await getAsyncThunkCalls(fetchCart(), storeState);

    expect(calls[1][0].type).toEqual(addCartFromStorage.type);
    expect(calls[1][0].payload).toEqual(undefined);
  });

  it('should fetchCart with resolve response', async () => {
    storeState.auth.user.id = "s1s1s1s1s1";
    jest.spyOn(apiCart, "getCart").mockReturnValue(Promise.resolve(cart));
    const calls = await getAsyncThunkCalls(fetchCart(), storeState);

    expect(calls[1][0].type).toEqual(addCart.type);
    expect(calls[1][0].payload).toEqual(cart);
  });

  it('should fetchCart with reject response', async () => {
    storeState.auth.user.id = "s1s1s1s1s1";
    jest.spyOn(apiCart, "getCart").mockReturnValue(Promise.reject({}));
    const calls = await getAsyncThunkCalls(fetchCart(), storeState);

    expect(calls[1][0].type).toEqual(addCartFromStorage.type);
    expect(calls[1][0].payload).toEqual(undefined);
  });
});