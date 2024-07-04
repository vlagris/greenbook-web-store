import { AuthRequest, AuthResponse, Auth } from "@/types";
import { mainApi } from "@/services/api/mainApi.ts";
import { authResponseAdapter } from "@/services/api/adapters";



export const authMainApi = mainApi.injectEndpoints({
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

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  endpoints: authEndpoints
} = authMainApi;
