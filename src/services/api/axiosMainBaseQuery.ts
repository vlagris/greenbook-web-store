import { AxiosError, AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { axiosMainApi } from "@/services/api/axiosMainApi.ts";
import { createHttpError } from "@/utils/createHttpError.ts";



export const axiosMainBaseQuery = (): BaseQueryFn<
  {
    url: string
    method?: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers']
  },
  unknown,
  unknown
> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosMainApi({ url, method, data, params });
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: createHttpError(err)
      //   {
      //     status: err.response?.status,
      //     data: err.response?.data || err.message,
      //   },
      }
    }
  }
