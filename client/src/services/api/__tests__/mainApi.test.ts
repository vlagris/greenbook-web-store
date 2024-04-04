import {AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import * as jwtDecode from "jwt-decode";
import { store } from "@/store/store.ts";
import * as authActions from "@/store/auth/actions.ts";
import {mainApi, onFulfilledRequest, onFulfilledResponse, onRejectedResponse} from "@/services/api/mainApi.ts";



const storeState = {
  auth: { loading: false, user: { id: "s1s1s1s1s1", email: "" }, token: { value: "asdfg.asdfg.asdfg" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] }
};

const emptyStoreState = {
  auth: { loading: false, user: { id: "", email: "" }, token: { value: "" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] }
};

const storeStateWithoutToken = {
  auth: { loading: false, user: { id: "s1s1s1s1s1", email: "" }, token: { value: "" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] }
}

const request: InternalAxiosRequestConfig = {
  headers: new AxiosHeaders
}

const response: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: request
}



describe('onFulfilledRequest', () => {
  const mockedGetState = jest.spyOn(store, "getState");


  it('should return config without token', async () => {
    mockedGetState.mockImplementation(() => emptyStoreState);
    const result = onFulfilledRequest(request);

    expect(result.headers.Authorization).toEqual(`Bearer `);
  });

  it('should return config with token', async () => {
    mockedGetState.mockImplementation(() => storeState);
    const result = onFulfilledRequest(request);

    expect(result.headers.Authorization).toEqual(`Bearer ${storeState.auth.token.value}`);
  });
});



describe('onFulfilledResponse', () => {
  const mockedFetchToken = jest.spyOn(authActions, "fetchToken").mockReturnValue(jest.fn());
  const mockedJwtDecode = jest.spyOn(jwtDecode, "jwtDecode").mockImplementation();
  const mockedDispatch = jest.spyOn(store, "dispatch").mockImplementation();
  const mockedGetState = jest.spyOn(store, "getState");

  afterEach(() => {
    mockedJwtDecode.mockClear();
    mockedDispatch.mockClear();
    mockedFetchToken.mockClear();
  })

  it('should ', async () => {
    mockedGetState.mockImplementation(() => emptyStoreState);
    onFulfilledResponse(response);

    expect(mockedJwtDecode).not.toHaveBeenCalled();
    expect(mockedFetchToken).not.toHaveBeenCalled();
    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it('should ', async () => {
    mockedJwtDecode.mockReturnValue({});
    mockedGetState.mockImplementation(() => storeState);
    onFulfilledResponse(response);

    expect(mockedJwtDecode).toHaveBeenCalled();
    expect(mockedJwtDecode).toHaveBeenCalledWith(storeState.auth.token.value);
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedFetchToken).toHaveBeenCalled();
  });

  it('should ', async () => {
    mockedJwtDecode.mockReturnValue({exp: 1000});
    mockedGetState.mockImplementation(() => storeState);
    onFulfilledResponse(response);

    expect(mockedJwtDecode).toHaveBeenCalled();
    expect(mockedJwtDecode).toHaveBeenCalledWith(storeState.auth.token.value);
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedFetchToken).toHaveBeenCalled();
  });

  it('should ', async () => {
    mockedJwtDecode.mockReturnValue({exp: 100000000000});
    mockedGetState.mockImplementation(() => storeState);
    onFulfilledResponse(response);

    expect(mockedJwtDecode).toHaveBeenCalled();
    expect(mockedJwtDecode).toHaveBeenCalledWith(storeState.auth.token.value);
    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedFetchToken).not.toHaveBeenCalled();
  });

  it('should ', async () => {
    mockedGetState.mockImplementation(() => storeStateWithoutToken);
    onFulfilledResponse(response);

    expect(mockedJwtDecode).not.toHaveBeenCalled();
    expect(mockedFetchToken).toHaveBeenCalled();
    expect(mockedDispatch).toHaveBeenCalled();
  });
});


describe('onRejectedResponse', () => {
  const mockedFetchToken = jest.spyOn(authActions, "fetchToken").mockReturnValue(jest.fn());
  const mockedDispatch = jest.spyOn(store, "dispatch").mockImplementation();
  const mockedMainApiRequest = jest.spyOn(mainApi, "request").mockImplementation();
  const responseError = { config: request, response: { ...response, status: 400 } };
  const responseErrorNotAuth = { config: request, response: { ...response, status: 401 } };
  const responseErrorNotAuthRepeat = { config: { ...request, _isRetry: true }, response: { ...response, status: 401 } };


  afterEach(() => {
    mockedDispatch.mockClear();
    mockedFetchToken.mockClear();
    mockedMainApiRequest.mockClear();
  })

  it('should ', async () => {
    try {
      await onRejectedResponse(responseError);
    } catch (err) {
      expect(err).toEqual(responseError);
    }
    expect(mockedFetchToken).not.toHaveBeenCalled();
    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedMainApiRequest).not.toHaveBeenCalled();
  });

  it('should ', async () => {
    try {
      await onRejectedResponse(responseErrorNotAuth);
    } finally {
      expect(mockedFetchToken).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalled();
      expect(mockedMainApiRequest).toHaveBeenCalled();
      expect(mockedMainApiRequest).toHaveBeenCalledWith(responseErrorNotAuthRepeat.config);
    }
  });
  it('should ', async () => {
    try {
      await onRejectedResponse(responseErrorNotAuthRepeat);
    } catch (err) {
      expect(err).toEqual(responseErrorNotAuthRepeat);
    }
    expect(mockedFetchToken).not.toHaveBeenCalled();
    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedMainApiRequest).not.toHaveBeenCalled();
  });
});