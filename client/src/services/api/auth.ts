import { mainApi } from "@/services/api/mainApi.ts";
import { AuthRequest, AuthResponse, Auth } from "@/types";
import { serverApi } from "@/services/api/serverApi.ts";
import { createHttpError } from "@/utils/createHttpError.ts";
import { authResponseAdapter } from "@/services/api/adapters";



export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  endpoints: authEndpoints
} = serverApi.injectEndpoints({
  endpoints: (build) => ({

    register: build.mutation<Auth, AuthRequest>({
      query: (args) => ({
        url: '/auth/signup',
        method: "post",
        data: args
      }),
      transformResponse: (response: AuthResponse) => authResponseAdapter(response),
    }),

    login: build.mutation<Auth, AuthRequest>({
      query: (args) => ({
        url: '/auth/login',
        method: "post",
        data: args
      }),
      transformResponse: (response: AuthResponse) => authResponseAdapter(response),
    }),

    logout: build.mutation<boolean, void>({
      query: () => ({
        url: '/auth/logout',
        method: "get",
      }),
      transformResponse: () => true,
    }),

  })
})




export async function register(requestData: AuthRequest) {
  try {
    const res = await mainApi.post<AuthResponse>('/auth/signup', requestData);
    return authResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function login(requestData: AuthRequest) {
  try {
    const res = await mainApi.post<AuthResponse>('/auth/login', requestData);
    return authResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function logout() {
  try {
    await mainApi.get('/auth/logout');
    return true;
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function getToken() {
  try {
    const res = await mainApi.get<TokenResponse>('/auth/token');
    return tokenResponseAdapter(res.data);
  } catch (err) {
    console.log(err)
    return Promise.reject(createHttpError(err as Error));
  }
}