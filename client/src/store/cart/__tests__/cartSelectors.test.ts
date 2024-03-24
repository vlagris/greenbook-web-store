import * as cartSelectors from "@/store/cart/selectors.ts";
import { cartState, cart, storeState } from "@/store/cart/__tests__/cartActions.test.ts";


describe('cart selectors', () => {

  it('should select state from state object', () => {
    const result = cartSelectors.state(storeState);

    expect(result).toEqual(cartState);
  });

  it('should select state from state object', () => {
    const result = cartSelectors.cart(storeState);

    expect(result).toEqual(cart);
  });

  it('should select state from state object', () => {
    const result = cartSelectors.totalQuantity(storeState);

    expect(result).toBe(1);
  });

  it('should select state from state object', () => {
    const result = cartSelectors.loading(storeState);

    expect(result).toBe(false);
  });
});