import genresData from "@/server-imitation/db/genres.json";


export function getAll() {
  return {
    status: 200,
    data: genresData
  }
}