import { mainApi } from "@/services/api/mainApi.ts";
import { User, UserResponse } from "@/types";
import { userResponseAdapter } from "@/services/api/adapters";



export interface UpdateEmail {
  email: string
}

export interface UpdatePassword {
  currentPassword: string
  newPassword: string
}


export const userMainApi = mainApi.injectEndpoints({
  endpoints: (build) => ({

    getUser: build.query<User, void>({
      query: () => ({
        url: '/user/',
        method: "get",
      }),
      transformResponse: (response: UserResponse) => userResponseAdapter(response),
    }),

    updateUser: build.mutation<User, FormData>({
      query: (args) => ({
        url: '/user',
        method: "patch",
        data: args
      }),
      transformResponse: (response: UserResponse) => userResponseAdapter(response),
    }),

    updateEmail: build.mutation<User, UpdateEmail>({
      query: (args) => ({
        url: '/user/email',
        method: "patch",
        data: args
      }),
      transformResponse: (response: UserResponse) => userResponseAdapter(response),
    }),

    updatePassword: build.mutation<boolean, UpdatePassword>({
      query: (args) => ({
        url: '/user/password',
        method: "patch",
        data: args
      }),
      transformResponse: () => true,
    }),

  })
})

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  endpoints: userEndpoints
} = userMainApi;
