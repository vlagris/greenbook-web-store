import {getAsyncThunkCalls} from "@/utils/utilsForTests.tsx";
import {login, setLoading, setToken, setUser} from "@/store/auth";
import * as cartActions from "@/store/cart/actions.ts";
import {authState, emptyStoreState} from "@/store/auth/__tests__/authActions.test.ts";
import * as apiAuth from "@/services/api/auth.ts";

describe('auth asyncThunk login', () => {
  const mockedFetchCart = jest.spyOn(cartActions, "fetchCart");
  const mockedApiLogin = jest.spyOn(apiAuth, "login");
  const loginData = { email: authState.user.email, password: "12345678" };

  afterEach(() => {
    mockedFetchCart.mockClear();
    mockedApiLogin.mockClear();
  })

  it('should login resolved', async () => {
    mockedApiLogin.mockResolvedValue(authState);
    const calls = await getAsyncThunkCalls(login(loginData), emptyStoreState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiLogin).toHaveBeenCalledTimes(1);
    expect(mockedApiLogin).toHaveBeenCalledWith(loginData);

    expect(calls[2][0].type).toEqual(setUser.type);
    expect(calls[2][0].payload).toEqual(authState.user);

    expect(calls[3][0].type).toEqual(setToken.type);
    expect(calls[3][0].payload).toEqual(authState.token);

    expect(mockedFetchCart).toHaveBeenCalledTimes(1);

    expect(calls[5][0].type).toEqual(setLoading.type);
    expect(calls[5][0].payload).toEqual(false);
  });

  it('should login rejected', async () => {
    mockedApiLogin.mockRejectedValue({ error: "error"} );
    const calls = await getAsyncThunkCalls(login(loginData), emptyStoreState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiLogin).toHaveBeenCalledTimes(1);
    expect(mockedApiLogin).toHaveBeenCalledWith(loginData);

    expect(mockedFetchCart).toHaveBeenCalledTimes(0);

    expect(calls[2][0].type).toEqual(setLoading.type);
    expect(calls[2][0].payload).toEqual(false);

    expect(calls[3][0].type).toEqual(login.rejected.type);
    expect(calls[3][0].payload).toEqual({ error: "error"});
  });
});