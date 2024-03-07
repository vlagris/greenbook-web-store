import {mainApi} from "@/services/api/mainApi.ts";


export async function getUser() {
  try {
    const res = await mainApi.get('/user');
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}