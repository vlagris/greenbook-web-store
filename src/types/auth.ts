import {Token, TokenResponse, User, UserResponse} from "@/types";

export type Auth = {
  user: User,
  token: Token,
}

export type AuthState = {
  isLoading: boolean,
  isSuccess: boolean,
  user: User,
  token: Token,
}

export type AuthResponse  = {
  user: UserResponse,
} & TokenResponse;

export type AuthRequest = {
  email: string,
  password: string,
}