import {mainApi} from "@/services/api/mainApi.ts";
import {AuthRequest, ErrorType, Token, UserDataState} from "@/types.ts";
import axios, {AxiosError} from "axios";
import {data} from "autoprefixer";


type AuthResponse  = {
  user: {
    _id: string,
    email: string,
  },
  accessToken: string,
  expiresIn: string
};

type RefreshTokenResponse = {
  accessToken: string,
}



function authResponseAdapter(data: AuthResponse): UserDataState {
  return {
    user: {
      id: data.user._id,
      email: data.user.email,
    },
    token: {
      value: data.accessToken,
      loading: false
    }
  };
}

function refreshTokenResponseAdapter(data: RefreshTokenResponse): Token {
  return {
    value: data.accessToken,
  };
}



export async function register(requestData: AuthRequest) {
  try {
    const res = await mainApi.post<AuthResponse>('/auth/signup', requestData);
    return authResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 400:
          return Promise.reject({
            type: err.response?.data?.error_code,
            message: err.response?.data?.error_message
          });
        case 403:
          return Promise.reject({
            type: ErrorType.NOT_AUTH,
            message: err.response?.data?.error_message
          });
        case 404:
          return Promise.reject({
            type: ErrorType.NOT_FOUND,
            message: err.response?.data?.error_message
          });
        case 500:
          return Promise.reject({
            type: ErrorType.SERVER_ERROR,
            message: err.response?.data?.error_message
          });
      }
    }
    return Promise.reject(err);
  }
}

export async function login(requestData: AuthRequest) {
  try {
    const res = await mainApi.post<AuthResponse>('/auth/login', requestData);
    return authResponseAdapter(res.data);
  } catch (err) {
    console.log(err);

    if (axios.isAxiosError(err)) {
      switch (err.response?.status) {
        case 400:
          return Promise.reject({
            type: err.response?.data?.error_code,
            message: err.response?.data?.error_message
          });
        case 403:
          return Promise.reject({
            type: ErrorType.NOT_AUTH,
            message: err.response?.data?.error_message
          });
        case 404:
          return Promise.reject({
            type: ErrorType.NOT_FOUND,
            message: err.response?.data?.error_message
          });
        case 500:
          return Promise.reject({
            type: ErrorType.SERVER_ERROR,
            message: err.response?.data?.error_message
          });
      }
    }

    return Promise.reject(err);
  }
}

export async function logout() {
  try {
    await mainApi.get('/auth/logout');
    return true;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function refreshToken() {
  try {
    const res = await mainApi.get<RefreshTokenResponse>('/auth/token');
    console.log(res.data);
    return refreshTokenResponseAdapter(res.data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}