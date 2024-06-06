import genresData from "@/server-imitation/db/genres.json";
import authorsData from "@/server-imitation/db/authors.json";
import booksData from "@/server-imitation/db/books.json";
import {errors} from "@/server-imitation/constants.ts";


function isBookByPathnameGenre(book: any, pathname: string) {
  return genresData.some(genreData => {
    if (genreData.pathName === pathname) {
      return book.genre.includes(genreData.id)
    }
    return false;
  })
}

function isBookInPrice(book: any, priceRange: string[]) {
  return book.price >= Number(priceRange[0]) && book.price <= Number(priceRange[1]);
}

function isBookByAuthors(book: any, authors: string[]) {
  return authors.some(author => {
    return book.author.includes(author);
  })
}


const booksOrdersMap = {
  popular: (a: any, b: any) => b.rating.count - a.rating.count,
  new: () => -1,
  price_desc: (a: any, b: any) => b.price - a.price,
  price_asc: (a: any, b: any) => a.price - b.price,
  rating: (a: any, b: any) => b.rating.rate - a.rating.rate,
  // popular: [['rating_count', 'DESC']],
  // new: [['createdAt', 'DESC']],
  // price_desc: [['price', 'DESC']],
  // price_asc: [['price', 'ASC']],
  // rating: [['rating_rate', 'DESC']],
}

export function getByGenre(req: any) {
  const skip = req.query.offset || 0;
  const limit = req.query.limit || 15;
  const genrePathName = req.query.pathName;
  // @ts-ignore
  const sort = booksOrdersMap[req.query.sort] || booksOrdersMap["popular"];
  const price = req.query.price?.split("-");
  const authors = req.query.authors?.split(",");


  if(!genrePathName) {
    return {
      status: 404,
      data: errors.BAD_REQUEST,
    }
  }


  const rawBooks = booksData.filter(book => {
    if (genrePathName && !isBookByPathnameGenre(book, genrePathName)) {
        return false
    }

    if (price && !isBookInPrice(book, price)) {
      return false;
    }

    if (authors && !isBookByAuthors(book, authors)) {
      return false;
    }

    return true;
  }).sort(sort);


  if(!rawBooks) {
    return {
      status: 404,
      data: errors.BAD_REQUEST,
    }
  }


  return {
    status: 200,
    data: {
      items: rawBooks.slice(skip, (skip + limit)),
      total: rawBooks.length,
    }
  }
}



export function getRecommended(req: any) {
  const limit = req.query.limit || 50;

  const books = booksData.slice(0, limit);

  return {
    status: 200,
    data: books
  }
}



export function getBooksFilters(req: any) {
  const genrePathName = req.query.pathName;


  if(!genrePathName) {
    return {
      status: 404,
      data: errors.BAD_REQUEST,
    }
  }


  const rawBooks = booksData.filter(book => {
    if (genrePathName && !isBookByPathnameGenre(book, genrePathName)) {
      return false
    }
    return true;
  });

  const maxPrice = Math.max(...rawBooks.map(book => book.price));
  const minPrice = Math.min(...rawBooks.map(book => book.price));
  const totalCount = rawBooks.length;

  const booksAuthors = rawBooks.reduce((result: string[], book) => {
    return result.concat(book.author)
  }, [])
  const authors = authorsData.filter(authorData => {
    return booksAuthors.includes(authorData.id);
  })


  return {
    status: 200,
    data: {
      items: [
        {
          name: "Цены",
          key: "price",
          type: "range",
          minPrice,
          maxPrice,
        },
        {
          items: authors,
          name: "Авторы",
          key: "authors",
          type: "select",
          maxSelect: 10
        },
      ],
      total: totalCount,
    }
  }
}