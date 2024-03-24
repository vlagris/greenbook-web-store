import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import useAuth from "@/hooks/useAuth.ts";

describe('useAuth', () => {
  const mockedUseSelector = jest.spyOn(reduxHooks, "useAppSelector");

  it('should return auth', () => {
    mockedUseSelector.mockReturnValue("");

    expect(useAuth()).toEqual({ isAuth: false });
  });

  it('should return not auth', () => {
    mockedUseSelector.mockReturnValue("1jd12kqd3fd3");

    expect(useAuth()).toEqual({ isAuth: true });
  });


});