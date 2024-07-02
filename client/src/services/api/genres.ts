import { mainApi } from "@/services/api/mainApi.ts";
import { GenreResponse, Genre } from "@/types";
import { serverApi } from "@/services/api/serverApi.ts";
import { createHttpError } from "@/utils/createHttpError.ts";
import { genresResponseAdepter } from "@/services/api/adapters";



export const {
  useGetGenresQuery,
  endpoints: genresEndpoints
} = serverApi.injectEndpoints({
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




export async function getGenres() {
  try {
    const res = await mainApi.get<GenreResponse[]>('/genres/');
    return genresResponseAdepter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}