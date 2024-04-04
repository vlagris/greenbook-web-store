import * as cartSelectors from "@/store/cart/selectors.ts";
import { cartState, cart, storeState } from "@/store/cart/__tests__/cartActions.test.ts";


describe('cart selectors', () => {

  it('should return select state from state', () => {
    const result = cartSelectors.state(storeState);

    expect(result).toEqual(cartState);
  });

  it('should return select state from state', () => {
    const result = cartSelectors.cart(storeState);

    expect(result).toEqual(cart);
  });

  it('should return select state from state', () => {
    const result = cartSelectors.totalQuantity(storeState);

    expect(result).toBe(1);
  });

  it('should return select state from state', () => {
    const result = cartSelectors.loading(storeState);

    expect(result).toBe(false);
  });
});