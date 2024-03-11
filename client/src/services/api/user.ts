import {mainApi} from "@/services/api/mainApi.ts";
import {createHttpError} from "@/utils/createHttpError.ts";


export async function getUser() {
  try {
    const res = await mainApi.get('/user');
    return res.data;
  } catch (err) {
    return createHttpError(err as Error);
  }
}