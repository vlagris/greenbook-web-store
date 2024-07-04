import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {API_URL} from "@/constants.ts";
import {authSelectors, removeAuth, removeCart, setToken, setTokenLoading, store} from "@/store";
import {TokenResponse} from "@/types";
import {tokenResponseAdapter} from "@/services/api/adapters";
import {jwtDecode} from "jwt-decode";



export const axiosMainApi = axios.create({
  withCredentials: true,
  baseURL: API_URL
});



async function getToken() {
  if (authSelectors.tokenLoading(store.getState())) {
    return;
  }

  store.dispatch(setTokenLoading(true));
  try {
    const response = await axios.get<TokenResponse>(
      API_URL + "/auth/token",
      { withCredentials: true }
    );
    const token = tokenResponseAdapter(response.data);
    store.dispatch(setToken(token));
    return token;
  } catch (err) {
    store.dispatch(removeAuth());
    store.dispatch(removeCart());
    return;
  } finally {
    store.dispatch(setTokenLoading(false));
  }
}



export function onFulfilledRequest(config: InternalAxiosRequestConfig) {
  config.headers.Authorization = `Bearer ${authSelectors.token(store.getState())}`;
  return config;
}

axiosMainApi.interceptors.request.use(onFulfilledRequest);




export function onFulfilledResponse(response: AxiosResponse) {
  const {user, token} = authSelectors.state(store.getState());

  if (!user.id) {
    return response;
  }

  if (!token.value) {
    getToken()
    return response;
  }

  const decode = jwtDecode(token.value);
  let expTime = 0;
  const curTime = new Date().getTime()

  if (decode.exp) {
    expTime = decode.exp * 1000;
  }
  if (expTime - curTime <= 120000) {
    getToken()
  }
  return response;
}



export async function onRejectedResponse(error: any) {
  const originalRequest = { ...error.config };
  originalRequest._isRetry = true;

  if (
    error.response?.status === 401 &&
    error.config &&
    !error.config._isRetry
  ) {
    await getToken();
    return axiosMainApi.request(originalRequest);
  }
  return Promise.reject(error);
}

axiosMainApi.interceptors.response.use(onFulfilledResponse, onRejectedResponse);
