import {getAsyncThunkCalls} from "@/utils/utilsForTests.tsx";
import {removeCartItem, removeItemFromCart} from "@/store/cart";
import {storeState, cartItem} from "@/store/cart/__tests__/cartActions.test.ts";
import * as apiCart from "@/services/api/cart.ts";



describe('cart asyncThunk removeItemFromCart', () => {
  const mockedApiRemoveCartItem = jest.spyOn(apiCart, "removeCartItem");

  it('should remove cart item without sending api request', async () => {
    mockedApiRemoveCartItem.mockImplementation();
    const calls = await getAsyncThunkCalls(removeItemFromCart(cartItem.id), storeState);

    expect(calls[1][0].type).toEqual(removeCartItem.type);
    expect(calls[1][0].payload).toEqual(cartItem.id);
    expect(mockedApiRemoveCartItem).toHaveBeenCalledTimes(0);
  });


  it('should remove cart item with sending api request', async () => {
    storeState.auth.user.id = "d1d1d1d1d1";
    mockedApiRemoveCartItem.mockImplementation();
    const calls = await getAsyncThunkCalls(removeItemFromCart(cartItem.id), storeState);

    expect(mockedApiRemoveCartItem).toHaveBeenCalledTimes(1);
    expect(mockedApiRemoveCartItem).toHaveBeenCalledWith(cartItem.id);
    expect(calls[1][0].type).toEqual(removeCartItem.type);
    expect(calls[1][0].payload).toEqual(cartItem.id);
  });
});