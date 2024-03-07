import {mainApi} from "@/services/api/mainApi.ts";
import {Genre} from "@/types.ts";


type GenreResponse = {
  _id: string,
  name: string,
  pathName: string,
};


function genresResponseAdepter(data: GenreResponse[]): Genre[] {
  return data.map((genre): Genre => {
    return {
      id: genre._id,
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
    console.log(err);
    return Promise.reject(err);
  }
}
