import * as apiCart from "@/services/api/cart.ts";
import { getAsyncThunkCalls } from "@/utils/utilsForTests.tsx";
import { updateCartItemQuantity, updateItemInCart } from "@/store/cart";
import { cartItem, storeState } from "@/store/cart/__tests__/cartActions.test.ts";

describe('cart asyncThunk updateItemInCart', () => {
  const mockedApiUpdateCartItem = jest.spyOn(apiCart, "updateCartItem");
  const updateCartItemData = { id: cartItem.id, quantity:2 };

  it('should update cart item without sending api request', async () => {
    mockedApiUpdateCartItem.mockImplementation();
    const calls = await getAsyncThunkCalls(updateItemInCart(updateCartItemData), storeState);

    expect(mockedApiUpdateCartItem).toHaveBeenCalledTimes(0);
    expect(calls[1][0].type).toEqual(updateCartItemQuantity.type);
    expect(calls[1][0].payload).toEqual(updateCartItemData);
  });


  it('should update cart item with sending api request', async () => {
    storeState.auth.user.id = "d1d1d1d1d1";
    mockedApiUpdateCartItem.mockImplementation();
    const calls = await getAsyncThunkCalls(updateItemInCart(updateCartItemData), storeState);

    expect(mockedApiUpdateCartItem).toHaveBeenCalledTimes(1);
    expect(mockedApiUpdateCartItem).toHaveBeenCalledWith(updateCartItemData);
    expect(calls[1][0].type).toEqual(updateCartItemQuantity.type);
    expect(calls[1][0].payload).toEqual(updateCartItemData);
  });
});