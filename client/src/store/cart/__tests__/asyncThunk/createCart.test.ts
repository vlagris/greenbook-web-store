import * as apiCart from "@/services/api/cart.ts";
import {getAsyncThunkCalls} from "@/utils/utilsForTests.tsx";
import {addCart, createCart} from "@/store/cart/actions.ts";
import {cart, storeState} from "@/store/cart/__tests__/cartActions.test.ts";



describe('cart asyncThunk createCart', () => {
  it('should createCart with resolve response', async () => {
    jest.spyOn(apiCart, "createCart").mockReturnValue(Promise.resolve(cart));
    const calls = await getAsyncThunkCalls(createCart(), storeState);

    expect(calls[1][0].type).toEqual(addCart.type);
    expect(calls[1][0].payload).toEqual(cart);
  });

  it('should createCart with reject response', async () => {
    jest.spyOn(apiCart, "createCart").mockReturnValue(Promise.reject({ error: "error" }));
    const calls = await getAsyncThunkCalls(createCart(), storeState);

    expect(calls[1][0].type).toEqual(createCart.rejected.type);
    expect(calls[1][0].payload).toEqual(undefined);
  });
});
