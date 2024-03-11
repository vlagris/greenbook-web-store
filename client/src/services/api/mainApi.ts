import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {API_URL} from "@/constants.ts";
import {fetchToken, userDataSelectors} from "../../store/auth";
import {store} from "@/store/store.ts";

export const mainApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

mainApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${userDataSelectors.token(store.getState())}`
    return config;
  }
)

mainApi.interceptors.response.use((response) => {
  const {user, token, loading} = userDataSelectors.state(store.getState());

  if (!user.id) {
    return response;
  }
  if (!token.value && !loading) {
    store.dispatch(fetchToken());
    return response;
  }

  const decode = jwtDecode(token.value);
  let expTime = 0;
  const curTime = new Date().getTime()

  if (decode.exp) {
    expTime = decode.exp * 1000;
  }
  if (expTime - curTime <= 120000) {
    store.dispatch(fetchToken());
  }

  return response;
}, async (error) => {
  const originalRequest = {...error.config};
  originalRequest._isRetry = true;

  if (
    error.response.state === 401 &&
    error.config &&
    !error.config._isRetry
  ) {
    await store.dispatch(fetchToken());
    return mainApi.request(originalRequest);
  }

  return Promise.reject(error);
});