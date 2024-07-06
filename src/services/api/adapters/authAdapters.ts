import {AuthResponse, Auth, Token, TokenResponse} from "@/types";
import {userResponseAdapter} from "@/services/api/adapters/userAdapters.ts";

export function tokenResponseAdapter(data: TokenResponse): Token {
  return {
    value: data.accessToken,
  };
}
export function authResponseAdapter(data: AuthResponse): Auth {
  return {
    user: userResponseAdapter(data.user),
    token: tokenResponseAdapter(data)
  };
}