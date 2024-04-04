import { getAsyncThunkCalls } from "@/utils/utilsForTests.tsx";
import { setLoading, setToken, fetchToken, removeAuth } from "@/store/auth";
import { removeCart } from "@/store/cart";
import { token, emptyStoreState, storeState } from "@/store/auth/__tests__/authActions.test.ts";
import {ErrorType} from "@/types.ts";
import * as apiAuth from "@/services/api/auth.ts";

describe('auth asyncThunk fetchToken', () => {
  const mockedApiGetToken = jest.spyOn(apiAuth, "getToken");

  afterEach(() => {
    mockedApiGetToken.mockClear();
  });

  it('should fetchToken resolved', async () => {
    const calls = await getAsyncThunkCalls(fetchToken(), emptyStoreState);

    expect(calls[1][0].type).toEqual(removeAuth.type);
    expect(calls[1][0].payload).toEqual(undefined);

    expect(calls[2][0].type).toEqual(removeCart.type);
    expect(calls[2][0].payload).toEqual(undefined);

    expect(mockedApiGetToken).toHaveBeenCalledTimes(0);

    expect(calls[3][0].type).toEqual(fetchToken.rejected.type);
    expect(calls[3][0].payload).toEqual({type: ErrorType.NOT_AUTH});
  });

  it('should fetchToken resolved', async () => {
    mockedApiGetToken.mockResolvedValue(token);
    const calls = await getAsyncThunkCalls(fetchToken(), storeState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiGetToken).toHaveBeenCalledTimes(1);

    expect(calls[2][0].type).toEqual(setToken.type);
    expect(calls[2][0].payload).toEqual(token);

    expect(calls[3][0].type).toEqual(setLoading.type);
    expect(calls[3][0].payload).toEqual(false);
  });

  it('should fetchToken rejected', async () => {
    mockedApiGetToken.mockRejectedValue({ error: "error"} );
    const calls = await getAsyncThunkCalls(fetchToken(), storeState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiGetToken).toHaveBeenCalledTimes(1);

    expect(calls[2][0].type).toEqual(setToken.type);
    expect(calls[2][0].payload).toEqual({ value: "" });

    expect(calls[3][0].type).toEqual(setLoading.type);
    expect(calls[3][0].payload).toEqual(false);

    expect(calls[4][0].type).toEqual(fetchToken.rejected.type);
    expect(calls[4][0].payload).toEqual({ error: "error"});
  });
});