import { mainApi } from "@/services/api/mainApi.ts";
import {serverApi} from "@/services/api/serverApi.ts";
import { Book, BookResponse, FiltersResponse, FiltersType } from "@/types";
import { createHttpError } from "@/utils/createHttpError.ts";
import { BooksResponseAdepter, filtersResponseAdepter } from "@/services/api/adapters";



export interface GetBooksByGenre {
  pathName: string,
  limit: number,
  offset?: number,
  sort?: string,
  price?: string,
  authors?: string,
}

export type GetBooksFilters = {
  pathName: string,
  price?: string,
  authors?: string,
}

export interface GetBooksRecommended {
  limit: number,
}


export const {
  useGetBooksByGenreMutation,
  useGetBooksFiltersMutation,
  useGetBooksRecommendedQuery,
  endpoints: booksEndpoints
} = serverApi.injectEndpoints({
  endpoints: (build) => ({

    getBooksRecommended: build.query<Book[], GetBooksRecommended>({
      query: (args) => ({
        url: '/books/recommended',
        method: "get",
        params: args
      }),
      transformResponse: (response: BookResponse[]) => BooksResponseAdepter(response),
    }),

    getBooksByGenre: build.mutation<Book[], GetBooksByGenre>({
      query: (args) => ({
        url: '/books',
        method: "get",
        params: args
      }),
      transformResponse: (response: BookResponse[]) => BooksResponseAdepter(response),
    }),

    getBooksFilters: build.mutation<FiltersType, GetBooksFilters>({
      query: (args) => ({
        url: '/books/filters',
        method: "get",
        params: args
      }),
      transformResponse: (response: FiltersResponse) => filtersResponseAdepter(response),
    }),

  })
})



export async function getBooksByGenre(requestData: GetBooksByGenre) {
  try {
    const res = await mainApi.get<BookResponse[]>('/books/', {params: requestData});
    return BooksResponseAdepter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function getBooksFilters(requestData: GetBooksFilters) {
  try {
    const res = await mainApi.get<FiltersResponse>('/books/filters', {params: requestData});
    return filtersResponseAdepter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}


export async function getBooksRecommended(requestData: GetBooksRecommended) {
  try {
    const res = await mainApi.get<BookResponse[]>('/books/recommended', {params: requestData});
    return BooksResponseAdepter(res.data);
  } catch (err) {
    return Promise.reject(createHttpError(err as Error));
  }
}



