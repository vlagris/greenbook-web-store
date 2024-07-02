import {serverApi} from "@/services/api/serverApi.ts";
import {genresEndpoints} from "@/services/api/genres.ts";
import {authEndpoints} from "@/services/api/auth.ts";
import {booksEndpoints} from "@/services/api/books.ts";
import {userEndpoints} from "@/services/api/user.ts";
import {cartEndpoints} from "@/services/api/cart.ts";


export * from "@/services/api/genres.ts";
export * from "@/services/api/books.ts";
export * from "@/services/api/auth.ts";
export * from "@/services/api/user.ts";
export * from "@/services/api/cart.ts";
export * from "@/services/api/geolocation.ts";


const endpoints = {
  ...serverApi.endpoints,
  ...authEndpoints,
  ...genresEndpoints,
  ...booksEndpoints,
  ...userEndpoints,
  ...cartEndpoints,
}

export {
  serverApi,
  endpoints
};
