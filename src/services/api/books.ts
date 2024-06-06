import {mainApi} from "@/services/api/mainApi.ts";
import {Book, BookResponse, Books, Filter, FilterItem, FiltersType, FilterType} from "@/types.ts";
import {createHttpError} from "@/utils/createHttpError.ts";


type BooksResponse = {
  items: BookResponse[],
  total: number,
};



type FilterItemResponse = {
  id: string,
  name: string
};

export type FilterPriceResponse = {
  type: FilterType.range,
  key: string,
  name: string,
  minPrice: number,
  maxPrice: number,
}

export type FilterSelectResponse = {
  type: FilterType.select,
  key: string,
  name: string,
  items: FilterItemResponse[],
  maxSelect: number
}

type FilterResponse = FilterPriceResponse | FilterSelectResponse;

type FiltersResponse = {
  items: FilterResponse[],
  total: number
};


function BooksResponseAdepter(data: BookResponse[]): Book[] {
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

function BooksByGenreResponseAdepter(data: BooksResponse): Books {
  return {
    items: BooksResponseAdepter(data.items),
    total: data.total,
  }
}

function filterItemsResponseAdepter(data: FilterItemResponse[]): FilterItem[] {
  return data.map(filterItem => ({
    id: filterItem.id,
    name: filterItem.name
  }))
}

function filterResponseAdepter(data: FilterResponse): Filter {
  const filterCommon = {
    key: data.key,
    name: data.name,
  }
  if (data.type === FilterType.select ) {
    return {
      ...filterCommon,
      type: data.type,
      maxSelect: data.maxSelect,
      items: filterItemsResponseAdepter(data.items)
    }
  }
  return {
    ...filterCommon,
    type: data.type,
    minPrice: data.minPrice,
    maxPrice: data.maxPrice
  }
}

function filtersResponseAdepter(data: FiltersResponse): FiltersType {
  return {
    items: data.items.map(filter => filterResponseAdepter(filter)),
    total: data.total
  }
}



export type GetBooksByGenre = {
  pathName: string,
  limit: number,
  offset?: number,
  sort?: string,
  price?: string,
  authors?: string,
}
export async function getBooksByGenre(requestData: GetBooksByGenre) {
  try {
    const res = await mainApi.get<BooksResponse>('/books/', {params: requestData});
    return BooksByGenreResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}

export type GetBooksFilters = {
  pathName: string,
}

export async function getBooksFilters(requestData: GetBooksFilters) {
  try {
    const res = await mainApi.get<FiltersResponse>('/books/filters', {params: requestData});
    return filtersResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}



interface GetBooksRecommended {
  limit: number,
}
export async function getBooksRecommended(requestData: GetBooksRecommended) {
  try {
    const res = await mainApi.get<BookResponse[]>('/books/recommended', {params: requestData});
    return BooksResponseAdepter(res.data);
  } catch (err) {
    return createHttpError(err as Error);
  }
}


