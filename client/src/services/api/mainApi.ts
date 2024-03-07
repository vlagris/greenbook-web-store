import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {API_URL} from "@/constants.ts";
import {refreshToken, selectToken} from "@/store/userData/userData.slice.ts";
import {store} from "@/store/store.ts";

export const mainApi = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

mainApi.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${selectToken(store.getState())}`
    return config
  }
)

mainApi.interceptors.response.use((response) => {

  // const {user, token} = store.getState().userData;
  //
  // if (!user.id) {
  //   return response;
  // }
  // if (!token.token) {
  //   store.dispatch(refreshToken());
  //   return response;
  // }
  //
  // const decode = jwtDecode(token.token);
  // let expTime = 0;
  // const curTime = new Date().getTime()
  //
  // if (decode.exp) {
  //   expTime = decode.exp * 1000;
  // }
  // if (expTime - curTime <= 120000) {
  //   store.dispatch(refreshToken());
  // }

  return response;
}, async (error) => {
  const originalRequest = {...error.config};
  originalRequest._isRetry = true;

  if (
    error.response.state === 401 &&
    error.config &&
    !error.config._isRetry
  ) {
    await store.dispatch(refreshToken());
    return mainApi.request(originalRequest);
  }

  return Promise.reject(error);
})