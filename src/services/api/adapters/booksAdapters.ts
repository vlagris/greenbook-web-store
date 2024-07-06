import {Book, BookResponse} from "@/types";

export function BooksResponseAdepter(data: BookResponse[]): Book[] {
  return data.map((book): Book => ({
    id: book.id,
    title: book.title,
    price: book.price,
    genres: book.Genres,
    authors: book.Authors,
    image: book.image,
    rating: {
      rate: book.rating_rate,
      count: book.rating_count,
    }
  }));
}