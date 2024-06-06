import {EntityState} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store/store.ts";

export type Genre = {
  id: string,
  name: string,
  pathName: string,
}

export type GenreResponse = {
  id: string,
  name: string,
  pathName: string,
};

export type Author = {
  id: string,
  name: string,
  pathName: string,
}

export type AuthorResponse = {
  id: string,
  name: string,
  pathName: string,
};

export type Book = {
  id: string,
  title: string,
  price: number,
  genres: Genre[],
  authors: Author[],
  image: string,
  rating: {
    rate: number,
    count: number,
  }
}

export type Books = {
  items: Book[],
  total: number,
}

export type BookResponse = {
  id: string,
  title: string,
  price: number,
  Genres: GenreResponse[],
  Authors: AuthorResponse[],
  image: string,
  rating_rate: number,
  rating_count: number,
}

export type CartItem = Pick<Book, "id" | "title" | "price" | "image"> & {
  quantity: number
}

export type Cart = {
  items: CartItem[],
  totalQuantity: number,
}

export type CartState = Omit<Cart, "items"> & {
 items: EntityState<CartItem, string>,
 loading: boolean
}

export type User = {
  id: string,
  email: string,
}

export type Token = {
  value: string,
};

export type authState = {
  loading: boolean,
  user: User,
  token: Token,
}

export type AuthRequest = {
  email: string,
  password: string,
}

export type UpdateCartItem = {
  id: string,
  quantity: number
}

export type AsyncThunkConfig<R> = {
  state: RootState,
  dispatch: AppDispatch,
  extra?: unknown;
  rejectValue: R,
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
}

export type ResponseError = {
  error_message: string,
  error_code?: number,
}

export enum LocalStorageNames {
  userId = "userId",
  cart = "cart"
}

export enum ErrorType {
  BAD_REQUEST = 0,
  INVALID_DATA = 1,
  NOT_VALIDATION = 2,
  EMAIL_BUSY = 3,
  NOT_AUTH = 4,
  NOT_FOUND = 5,
  SERVER_ERROR = 6,
  INVALID_REFRESH_TOKEN = 7
}

export type HttpError = {
  type: ErrorType,
  message?: string
}



export enum FilterType {
  select = "select",
  range = "range",
  // selectOne = "selectOne",
  // toggle = "toggle"
}

export type FilterItem = {
  id: string,
  name: string
}

export type FilterCommon = {
  type: FilterType,
  key: string,
  name: string,
}

export type FilterPrice = FilterCommon & {
  type: FilterType.range,
  minPrice: number,
  maxPrice: number,
}

export type FilterSelect = FilterCommon & {
  type: FilterType.select,
  items: FilterItem[],
  maxSelect: number
}

export type Filter = FilterPrice | FilterSelect;

export type FiltersType = {
  items: Filter[],
  total: number
}
