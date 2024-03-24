import { getAsyncThunkCalls } from "@/utils/utilsForTests.tsx";
import { logout, removeAuth, setLoading } from "@/store/auth";
import { removeCart } from "@/store/cart";
import { emptyStoreState } from "@/store/auth/__tests__/authActions.test.ts";
import * as apiAuth from "@/services/api/auth.ts";

describe('auth asyncThunk logout', () => {
  const mockedApiLogout = jest.spyOn(apiAuth, "logout");

  afterEach(() => {
    mockedApiLogout.mockClear();
  })

  it('should logout resolved', async () => {
    mockedApiLogout.mockResolvedValue(true);
    const calls = await getAsyncThunkCalls(logout(), emptyStoreState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiLogout).toHaveBeenCalledTimes(1);

    expect(calls[2][0].type).toEqual(removeAuth.type);
    expect(calls[2][0].payload).toEqual(undefined);

    expect(calls[3][0].type).toEqual(removeCart.type);
    expect(calls[3][0].payload).toEqual(undefined);

    expect(calls[4][0].type).toEqual(setLoading.type);
    expect(calls[4][0].payload).toEqual(false);
  });

  it('should logout rejected', async () => {
    mockedApiLogout.mockRejectedValue({ error: "error" });
    const calls = await getAsyncThunkCalls(logout(), emptyStoreState);

    expect(calls[1][0].type).toEqual(setLoading.type);
    expect(calls[1][0].payload).toEqual(true);

    expect(mockedApiLogout).toHaveBeenCalledTimes(1);

    expect(calls[2][0].type).toEqual(setLoading.type);
    expect(calls[2][0].payload).toEqual(false);

    expect(calls[3][0].type).toEqual(logout.rejected.type);
    expect(calls[3][0].payload).toEqual({ error: "error"});
  });
});