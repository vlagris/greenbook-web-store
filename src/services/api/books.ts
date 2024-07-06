import {mainApi} from "@/services/api/mainApi.ts";
import { Book, BookResponse, FiltersResponse, FiltersType } from "@/types";
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


export const booksMainApi = mainApi.injectEndpoints({
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

export const {
  useGetBooksByGenreMutation,
  useGetBooksFiltersMutation,
  useGetBooksRecommendedQuery,
  endpoints: booksEndpoints
} = booksMainApi;
