import {Author, AuthorResponse, Genre, GenreResponse} from "@/types";

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