import {mainApi} from "@/services/api/mainApi.ts";
import {Book, Books, BookResponse} from "@/types.ts";
import {createHttpError} from "@/utils/createHttpError.ts";


type BooksResponse = {
  items: BookResponse[],
  totalItems: number
};


function bookResponseAdepter(data: BookResponse): Book {
    return {
      id: data._id,
      title: data.title,
      price: data.price,
      genres: data.genres,
      authors: data.authors,
      image: data.image,
      rating: {
        rate: data.rating.rate,
        count: data.rating.count,
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
function BooksRecommendedResponseAdepter(data: BookResponse[]): Book[] {
  return data.map((book): Book => bookResponseAdepter(book));
}



interface IGetBooksByGenre {
  pathName: string,
  limit: number,
  offset?: number
}
export async function getBooksByGenre(requestData: IGetBooksByGenre) {
  const params = {
    pathName: requestData.pathName,
    limit: requestData.limit,
    offset: requestData.offset
  };
  try {
    const res = await mainApi.get<BooksResponse>('/books/', {params});
    return BooksByGenreResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}



interface IGetBooksRecommended {
  limit: number,
}
export async function getBooksRecommended(requestData: IGetBooksRecommended) {
  const params = { limit: requestData.limit };
  try {
    const res = await mainApi.get<BookResponse[]>('/books/recommended', {params});
    return BooksRecommendedResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}


