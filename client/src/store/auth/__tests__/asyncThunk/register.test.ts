import { getAsyncThunkCalls } from "@/utils/utilsForTests.tsx";
import {register, setLoading, setToken, setUser} from "@/store/auth";
import * as cartActions from "@/store/cart/actions.ts";
import {emptyStoreState, authState} from "@/store/auth/__tests__/authActions.test.ts";
import * as apiAuth from "@/services/api/auth.ts";



describe('auth asyncThunk register', () => {
  const mockedCreateCart = jest.spyOn(cartActions, "createCart");
  const mockedApiRegister = jest.spyOn(apiAuth, "register");
  const registerData = {email: authState.user.email, password: "12345678"};

  afterEach(() => {
    mockedCreateCart.mockClear();
    mockedApiRegister.mockClear();
  })

  it('should register resolved', async () => {
    mockedApiRegister.mockResolvedValue(authState);
    const calls = await getAsyncThunkCalls(register(registerData), emptyStoreState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiRegister).toHaveBeenCalledTimes(1);
    expect(mockedApiRegister).toHaveBeenCalledWith(registerData);

    expect(calls[2][0].type).toEqual(setUser.type);
    expect(calls[2][0].payload).toEqual(authState.user);

    expect(calls[3][0].type).toEqual(setToken.type);
    expect(calls[3][0].payload).toEqual(authState.token);

    expect(mockedCreateCart).toHaveBeenCalledTimes(1);

    expect(calls[5][0].type).toEqual(setLoading.type);
    expect(calls[5][0].payload).toEqual(false);
  });

  it('should register rejected', async () => {
    mockedApiRegister.mockRejectedValue({ error: "error"} );
    const calls = await getAsyncThunkCalls(register(registerData), emptyStoreState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiRegister).toHaveBeenCalledTimes(1);
    expect(mockedApiRegister).toHaveBeenCalledWith(registerData);

    expect(mockedCreateCart).toHaveBeenCalledTimes(0);

    expect(calls[2][0].type).toEqual(setLoading.type);
    expect(calls[2][0].payload).toEqual(false);

    expect(calls[3][0].type).toEqual(register.rejected.type);
    expect(calls[3][0].payload).toEqual({ error: "error"});
  });
});