// import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
// import { jwtDecode } from "jwt-decode";
// import { store } from "@/store/store.ts";
// import { fetchToken, authSelectors } from "@/store/auth";
// import { API_URL } from "@/constants.ts";

export {default as mainApi} from "@/server-imitation";


// export const mainApi = axios.create({
//   withCredentials: true,
//   baseURL: API_URL
// });
//
//
//
//
// export function onFulfilledRequest(config: InternalAxiosRequestConfig) {
//   config.headers.Authorization = `Bearer ${authSelectors.token(store.getState())}`;
//   return config;
// }
//
// mainApi.interceptors.request.use(onFulfilledRequest);
//
//
//
// export function onFulfilledResponse(response: AxiosResponse) {
//   const {user, token} = authSelectors.state(store.getState());
//
//   if (!user.id) {
//     return response;
//   }
//   if (!token.value) {
//     store.dispatch(fetchToken());
//     return response;
//   }
//
//   const decode = jwtDecode(token.value);
//   let expTime = 0;
//   const curTime = new Date().getTime()
//
//   if (decode.exp) {
//     expTime = decode.exp * 1000;
//   }
//   if (expTime - curTime <= 120000) {
//     store.dispatch(fetchToken());
//   }
//
//   return response;
// }
//
// export async function onRejectedResponse(error: any) {
//   const originalRequest = {...error.config};
//   originalRequest._isRetry = true;
//
//   if (
//     error.response?.status === 401 &&
//     error.config &&
//     !error.config._isRetry
//   ) {
//     await store.dispatch(fetchToken());
//     return mainApi.request(originalRequest);
//   }
//
//   return Promise.reject(error);
// }
//
// mainApi.interceptors.response.use(onFulfilledResponse, onRejectedResponse);