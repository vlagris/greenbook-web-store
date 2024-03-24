import { authState, token, user, storeState } from "@/store/auth/__tests__/authActions.test.ts";
import * as authSelectors from "@/store/auth/selectors.ts";


describe('auth selectors', () => {

  it('should select state from state object', () => {
    const result = authSelectors.state(storeState);

    expect(result).toEqual(authState);
  });

  it('should select user from state object', () => {
    const result = authSelectors.user(storeState);

    expect(result).toEqual(user);
  });

  it('should select user id from state object', () => {
    const result = authSelectors.userId(storeState);

    expect(result).toBe(user.id);
  });

  it('should select token from state object', () => {
    const result = authSelectors.token(storeState);

    expect(result).toBe(token.value);
  });
});