import {mainApi} from "@/services/api/mainApi.ts";
import {Genre, GenreResponse} from "@/types.ts";
import {createHttpError} from "@/utils/createHttpError.ts";


function genresResponseAdepter(data: GenreResponse[]): Genre[] {
  return data.map((genre): Genre => {
    return {
      id: genre.id,
      name: genre.name,
      pathName: genre.pathName
    }
  });
}


export async function getGenres() {
  try {
    const res = await mainApi.get<GenreResponse[]>('/genres/');
    return genresResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}
