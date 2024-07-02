import {Genre, GenreResponse} from "@/types";

export function genresResponseAdepter(data: GenreResponse[]): Genre[] {
  return data.map((genre): Genre => {
    return {
      id: genre.id,
      name: genre.name,
      pathName: genre.pathName
    }
  });
}
