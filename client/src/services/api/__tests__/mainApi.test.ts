import { mainApi } from "@/services/api/mainApi.ts";
import {jwtDecode} from "jwt-decode";
import {API_URL} from "@/constants.ts";
import {fetchToken, authSelectors} from "@/store/auth";
import {store} from "@/store/store.ts";

jest.mock('axios', () => {
  return {
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn()
      },
      response: {
        use: jest.fn(),
        eject: jest.fn()
      },
    },
  };
});
describe('main api', () => {
  it('should ', () => {

  });
});