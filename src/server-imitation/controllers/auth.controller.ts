import {nanoid} from "nanoid";
import genresData from "@/server-imitation/db/genres.json";
import {errors} from "@/server-imitation/constants.ts";


export function signup(req: any) {
  const email = req.body.email;
  const password = req.body.password;

  const usersData = JSON.parse(localStorage.getItem("usersData") || "[]");

  const isUseEmail = usersData.some((userData: any) => {
    return userData.email === email
  })

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

  const newUsersData = usersData;

  newUsersData.push(user);
  if (newUsersData.length > 10) {
    newUsersData.shift();
  }
  localStorage.setItem("usersData", JSON.stringify(newUsersData));

  const cartsData = JSON.parse(localStorage.getItem("cartsData") || "[]");

  if (cartsData.length > 10) {
    cartsData.shift();
  }

  localStorage.setItem("cartsData", JSON.stringify(cartsData));



  return {
    status: 200,
    data: {
      user: user,
      accessToken: user.id,
    }
  }
}



export function login(req: any) {
  const email = req.body.email;
  const password = req.body.password;

  const usersData = localStorage.getItem("usersData") || "[]";

  let user: any;

  JSON.parse(usersData).forEach((userData: any) => {
    if (userData.email === email && userData.password === password) {
      user = userData;
    }
  })

  if (!user) {
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



export function refreshToken(req: any) {
  const userId = req.userId;


  if (!userId) {
    return {
      status: 403,
      data: errors.INVALID_REFRESH_TOKEN
    };
  }

  const usersData = localStorage.getItem("usersData") || "[]";

  const isUserId = JSON.parse(usersData).some((userData: any) => {
    return userData.id === userId
  })

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

