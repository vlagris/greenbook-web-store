import { mainApi } from "@/services/api/mainApi.ts";
import { serverApi } from "@/services/api/serverApi.ts";
import { User, UserResponse } from "@/types";
import { createHttpError } from "@/utils/createHttpError.ts";
import { userResponseAdapter } from "@/services/api/adapters";



export interface UpdateEmail {
  email: string
}

export interface UpdatePassword {
  currentPassword: string
  newPassword: string
}


export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  endpoints: userEndpoints
} = serverApi.injectEndpoints({
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




export async function getUser() {
  try {
    const res = await mainApi.get<UserResponse>('/user/');
    return userResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function updateUser(requestData: UpdateUser) {
  try {
    console.log(requestData);
    const res = await mainApi.patch<UserResponse>('/user/', requestData);
    return userResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function updateEmail(requestData: UpdateEmail) {
  try {
    const res = await mainApi.patch<UserResponse>('/user/email', requestData);
    return userResponseAdapter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function updatePassword(requestData: UpdatePassword) {
  try {
    const res = await mainApi.patch('/user/password', requestData);
    return true;
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}