import { createApi } from "@reduxjs/toolkit/query/react";
import {axiosMainBaseQuery} from "@/services/api/axiosMainBaseQuery.ts";



export const mainApi = createApi({
  reducerPath: "serverApi",
  baseQuery: axiosMainBaseQuery(),
  endpoints: () => ({})
})