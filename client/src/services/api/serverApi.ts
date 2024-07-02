import { createApi } from "@reduxjs/toolkit/query/react";
import {axiosMainBaseQuery} from "@/services/api/axiosMainBaseQuery.ts";




export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: axiosMainBaseQuery(),
  endpoints: () => ({})
})