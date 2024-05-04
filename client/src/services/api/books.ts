import {mainApi} from "@/services/api/mainApi.ts";
import {Book, Books, BookResponse} from "@/types.ts";
import {createHttpError} from "@/utils/createHttpError.ts";


type BooksResponse = {
  items: BookResponse[],
  totalItems: number
};


function bookResponseAdepter(data: BookResponse): Book {
    return {
      id: data.id,
      title: data.title,
      price: data.price,
      genres: data.Genres,
      authors: data.Authors,
      image: data.image,
      rating: {
        rate: data.rating_rate,
        count: data.rating_count,
      }
    }
}
function BooksByGenreResponseAdepter(data: BooksResponse): Books {
  const items = data.items.map((book): Book => bookResponseAdepter(book));
  return {
    items,
    totalItems: data.totalItems
  }
}
function BooksResponseAdepter(data: BookResponse[]): Book[] {
  return data.map((book): Book => bookResponseAdepter(book));
}



interface IGetBooksByGenre {
  pathName: string,
  limit: number,
  offset?: number
}
export async function getBooksByGenre(requestData: IGetBooksByGenre) {
  try {
    const res = await mainApi.get<BooksResponse>('/books/', {params: requestData});
    return BooksByGenreResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}



interface IGetBooksRecommended {
  limit: number,
}
export async function getBooksRecommended(requestData: IGetBooksRecommended) {
  try {
    const res = await mainApi.get<BookResponse[]>('/books/recommended', {params: requestData});
    return BooksResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}


