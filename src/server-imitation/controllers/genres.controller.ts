import {db} from "@/server-imitation/db/indexedDB.ts";


export async function getAll() {
  const genres = await db.getAll("genres");

  return {
    status: 200,
    data: genres
  }
}