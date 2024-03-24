import {authReducer, removeAuth, setLoading, setToken, setUser} from "@/store/auth";

export const user = {
  id: "s1s1s1s1s1",
  email: "test@mail.com"
}

export const token = {
  value: "upadfl.fmjsoe.fkjmsl",
}

export const authState = {
  loading: false,
  user: user,
  token: token
}

export const emptyStoreState = {
  auth: { loading: false, user: { id: "", email: "" }, token: { value: "" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] }
};

export const storeState = {
  auth: authState,
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] }
};



describe('auth actions', () => {
  const emptyAuthState = emptyStoreState.auth;

  it('should return default state when passed an empty action', () => {
    const result = authReducer(undefined, { type: "" })

    expect(result).toEqual(emptyAuthState);
  });

  it('should add new authorization with "addCart" action', () => {
    const action = { type: setUser.type, payload: user }
    const result = authReducer(emptyAuthState, action);

    expect(result.user).toEqual(user);
    expect(result.token).toEqual(emptyAuthState.token);
    expect(result.loading).toEqual(emptyAuthState.loading);
  });

  it('should empty cart with "removeCart" action', () => {
    const action = { type: setToken.type, payload: token }
    const result = authReducer(emptyAuthState, action);

    expect(result.token).toEqual(token);
    expect(result.user).toEqual(emptyAuthState.user);
    expect(result.loading).toEqual(emptyAuthState.loading);
  });

  it('should add new cart item with "addCartItem" action', () => {
    const action = { type: setLoading.type, payload: true }
    const result = authReducer(emptyAuthState, action);

    expect(result.loading).toEqual(true);
    expect(result.user).toEqual(emptyAuthState.user);
    expect(result.token).toEqual(emptyAuthState.token);
  });

  it('should remove cart item with "removeCartItem" action', () => {
    const action = { type: removeAuth.type, payload: "" }
    const result = authReducer(authState, action);

    expect(result).toEqual(emptyAuthState);
  });
});