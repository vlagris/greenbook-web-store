import { mainApi } from "@/services/api/mainApi.ts";
import { AuthRequest, Token, authState, User } from "@/types.ts";
import { createHttpError } from "@/utils/createHttpError.ts";


type userResponse = {
  _id: string,
  email: string,
}
type TokenResponse = {
  accessToken: string,
}
type AuthResponse  = {
  user: userResponse,
} & TokenResponse;



function userResponseAdapter(data: userResponse): User {
  return {
    id: data._id,
    email: data.email,
  };
}
function tokenResponseAdapter(data: TokenResponse): Token {
  return {
    value: data.accessToken,
  };
}
function authResponseAdapter(data: AuthResponse): authState {
  return {
    loading: false,
    user: userResponseAdapter(data.user),
    token: tokenResponseAdapter(data)
  };
}



export async function register(requestData: AuthRequest) {
  try {
    const res = await mainApi.post<AuthResponse>('/auth/signup', requestData);
    return authResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}


export async function login(requestData: AuthRequest) {
  try {
    const res = await mainApi.post<AuthResponse>('/auth/login', requestData);
    return authResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}


export async function logout() {
  try {
    await mainApi.get('/auth/logout');
    return true;
  } catch (err) {
    return createHttpError(err as Error);
  }
}


export async function getToken() {
  try {
    const res = await mainApi.get<TokenResponse>('/auth/token');
    return tokenResponseAdapter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}