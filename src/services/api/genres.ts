import { GenreResponse, Genre } from "@/types";
import { mainApi } from "@/services/api/mainApi.ts";
import { genresResponseAdepter } from "@/services/api/adapters";



export const genresMainApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query<Genre[], void>({
      query: (args) => ({
        url: '/genres/',
        method: "get",
        params: { ids: args }
      }),
      transformResponse: (response: GenreResponse[]) => genresResponseAdepter(response),
    })
  })
});

export const {
  useGetGenresQuery,
  endpoints: genresEndpoints
} = genresMainApi;
