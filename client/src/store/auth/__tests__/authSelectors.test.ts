import { authState, token, user, storeState } from "@/store/auth/__tests__/authActions.test.ts";
import * as authSelectors from "@/store/auth/selectors.ts";


describe('auth selectors', () => {

  it('should return select state from state', () => {
    const result = authSelectors.state(storeState);

    expect(result).toEqual(authState);
  });

  it('should return select user from state', () => {
    const result = authSelectors.user(storeState);

    expect(result).toEqual(user);
  });

  it('should return select user id from state', () => {
    const result = authSelectors.userId(storeState);

    expect(result).toBe(user.id);
  });

  it('should return select token from state', () => {
    const result = authSelectors.token(storeState);

    expect(result).toBe(token.value);
  });
});