import axios from "axios";
import {mainApi} from "@/services/api/mainApi.ts";



export type UserIp = {
  id: string
}

export type UserGeolocation = {
  "location": null | {
    "value": string,
    "unrestricted_value": string,
    "data": {
      "city": string,
    }
  }
}

export const geolocationMainApi = mainApi.injectEndpoints({
  endpoints: (build) => ({

    getUserIp: build.query<UserIp, void>({
      queryFn: async () => {
        try {
          const response = await axios.get<UserIp>("https://api.ipify.org?format=json")
          return { data: response.data }
        } catch (err) {
          return Promise.reject(err);
        }
      }
    }),

    getUserGeolocation: build.mutation<UserGeolocation, UserIp>({
      queryFn: async (args) => {
        try {
          const response = await axios.post(
            "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address",
            args,
            {
              headers: {
                Authorization: "Token efec08bc9d906d89af079975067a33ed501486c4"
              }
            }
          )
          return { data: response.data }
        } catch (err) {
          return Promise.reject(err);
        }
      }
    })

  })
});

export const {
  useGetUserIpQuery,
  useGetUserGeolocationMutation,
  endpoints: geolocationEndpoints
} = geolocationMainApi;