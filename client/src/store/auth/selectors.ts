import {RootState} from "@/store/store.ts";

export const state = (state: RootState) => state.auth;
export const user = (state: RootState) => state.auth.user;
export const userId = (state: RootState) => state.auth.user.id;
export const token = (state: RootState) => state.auth.token.value;
