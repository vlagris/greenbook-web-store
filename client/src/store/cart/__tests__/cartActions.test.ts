import { cartReducer, addCart, addCartFromStorage, addCartItem, removeCart, removeCartItem, updateCartItemQuantity } from "@/store/cart";
import { cart as LocalStorageCart } from "src/services/objectLocalStorage";



export const cartItem = {
  id: "s1s1s1s1s1s1",
  title: "title",
  price: 10,
  image: "image",
  quantity: 1
};

export const cartState = {
  items: {
    ids: [cartItem.id],
    entities: { [cartItem.id]: cartItem }
  },
  totalQuantity: 1,
  loading: false,
}

export const cart = {
  items: [cartItem],
  totalQuantity: 1,
}

export const storeState = {
  cart: cartState,
  auth: { loading: false, user: { id: "", email: "" }, token: { value: "" } },
  genres: { items: [] }
};



describe('cart actions', () => {
  const defaultCartState = {
    items: { entities: {}, ids: [] },
    loading: true,
    totalQuantity: 0
  }

  const emptyCartState = {
    items: { entities: {}, ids: [] },
    loading: false,
    totalQuantity: 0
  }

  it('should return default state when passed an empty action', () => {
    const result = cartReducer(undefined, { type: "" })

    expect(result).toEqual(defaultCartState);
  });

  it('should add new cart with "addCart" action', () => {
    const action = { type: addCart.type, payload: cart }
    const result = cartReducer(defaultCartState, action);

    expect(result).toEqual(cartState);
  });

  it('should add cart from with "addCartFromStorage" action', () => {
    jest.spyOn(LocalStorageCart, "get").mockReturnValue(cartState);
    const action = { type: addCartFromStorage.type, payload: undefined }
    const result = cartReducer(defaultCartState, action);

    expect(result).toEqual(cartState);
  });

  it('should not add cart from with "addCartFromStorage" action', () => {
    jest.spyOn(LocalStorageCart, "get").mockReturnValue(null);
    const action = { type: addCartFromStorage.type, payload: undefined }
    const result = cartReducer(defaultCartState, action);

    expect(result).toEqual(emptyCartState);
  });

  it('should empty cart with "removeCart" action', () => {
    const action = { type: removeCart.type, payload: undefined }
    const result = cartReducer(defaultCartState, action);

    expect(result).toEqual(emptyCartState);
  });

  it('should add new cart item with "addCartItem" action', () => {
    const action = { type: addCartItem.type, payload: cartItem }
    const result = cartReducer(emptyCartState, action);

    expect(result).toEqual(cartState);
  });

  it('should not add an item to cart using the "addCartItem" action', () => {
    const action = { type: addCartItem.type, payload: cartItem }
    const result = cartReducer(cartState, action);

    expect(result).toEqual(cartState);
  });

  it('should remove cart item with "removeCartItem" action', () => {
    const action = { type: removeCartItem.type, payload: cartItem.id }
    const result = cartReducer(cartState, action);

    expect(result).toEqual(emptyCartState);
  });

  it('should not remove cart item with "removeCartItem" action', () => {
    const action = { type: removeCartItem.type, payload: "d1d1d1d1" }
    const result = cartReducer(cartState, action);

    expect(result).toEqual(cartState);
  });

  it('should update cart item quantity with "updateCartItemQuantity" action', () => {
    const action = { type: updateCartItemQuantity.type, payload: {id: cartItem.id, quantity: 2} }
    const result = cartReducer(cartState, action);

    expect(result.items.entities[cartItem.id].quantity).toBe(2);
  });
});