import {nanoid} from "nanoid";
import {errors} from "@/server-imitation/constants.ts";
import {db} from "@/server-imitation/db/indexedDB.ts";


export async function signup(req: any) {
  const { email, password } = req.body;


  const isUseEmail = await db.getFromIndex("users", "email", email);


  if (isUseEmail) {
    return {
      status: 400,
      data: errors.EMAIL_BUSY
    };
  }


  const user = {
    id: nanoid(),
    email,
    password
  }

  await db.add("users", user);


  return {
    status: 200,
    data: {
      user: user,
      accessToken: user.id,
    }
  }
}



export async function login(req: any) {
  const email = req.body.email;
  const password = req.body.password;


  const user = await db.getFromIndex("users", "email", email);


  if (!user && user.password !== password) {
    return {
      status: 400,
      data: errors.INVALID_DATA
    };
  }


  return {
    status: 200,
    data: {
      user: user,
      accessToken: user.id,
    }
  }
}



export function logout() {
  return {
    status: 200,
    data: {
      success: false
    }
  }
}



export async function refreshToken(req: any) {
  const userId = req.userId;


  if (!userId) {
    return {
      status: 403,
      data: errors.INVALID_REFRESH_TOKEN
    };
  }


  const isUserId = await db.get("users", userId);


  if (!isUserId) {
    return {
      status: 400,
      data: errors.EMAIL_BUSY
    };
  }


  return {
    status: 200,
    data: {
      accessToken: userId
    }
  }
}

