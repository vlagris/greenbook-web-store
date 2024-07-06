import {errors} from "@/server-imitation/constants.ts";
import {db} from "@/server-imitation/db/indexedDB.ts";



function isBookInPrice(book: any, priceRange: string[]) {
  return book.price >= Number(priceRange[0]) && book.price <= Number(priceRange[1]);
}

function isBookByAuthors(book: any, authors: string[]) {
  return authors.some(author => {
    return book.authors.includes(author);
  })
}


const booksOrdersMap = {
  popular: (a: any, b: any) => b.rating_count - a.rating_count,
  new: () => -1,
  price_desc: (a: any, b: any) => b.price - a.price,
  price_asc: (a: any, b: any) => a.price - b.price,
  rating: (a: any, b: any) => b.rating_rate - a.rating_rate,
}

export async function getByGenre(req: any) {
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


  const genre = await db.getFromIndex("genres", "pathName", genrePathName);

  let rawBooks = [];
  let cursor = await db.transaction('books')
    .store.index("genres").openCursor(genre.id);
  while (cursor) {
    if (
      !(price && !isBookInPrice(cursor.value, price)) &&
      !(authors && !isBookByAuthors(cursor.value, authors))
    ) {
      rawBooks.push(cursor.value);
    }
    cursor = await cursor.continue();
  }

  const books = rawBooks.sort(sort).slice(skip, (skip + limit));


  if(!rawBooks) {
    return {
      status: 404,
      data: errors.BAD_REQUEST,
    }
  }


  return {
    status: 200,
    data: books
  }
}



export async function getRecommended(req: any) {
  const limit = req.query.limit || 50;

  const books = await db.getAll("books", null, limit);

  return {
    status: 200,
    data: books
  }
}



export async function getBooksFilters(req: any) {
  const genrePathName = req.query.pathName;
  const priceFilter = req.query.price?.split("-");
  const authorsFilter = req.query.authors?.split(",");

  if(!genrePathName) {
    return {
      status: 404,
      data: errors.BAD_REQUEST,
    }
  }


  const genre = await db.getFromIndex("genres", "pathName", genrePathName);
  let books = [];
  let booksForPrice = [];
  let booksForAuthors = [];
  let cursor = await db.transaction('books')
    .store.index("genres").openCursor(genre.id);
  while (cursor) {
    if (!(authorsFilter && !isBookByAuthors(cursor.value, authorsFilter))) {
      booksForPrice.push(cursor.value);
    }

    if (!(priceFilter && !isBookInPrice(cursor.value, priceFilter))) {
      booksForAuthors.push(cursor.value);
    }
    if (
      !(priceFilter && !isBookInPrice(cursor.value, priceFilter)) &&
      !(authorsFilter && !isBookByAuthors(cursor.value, authorsFilter))
    ) {
      books.push(cursor.value);
    }
    cursor = await cursor.continue();
  }


  const authors = await db.getAll("authors");
  const maxPrice = Math.max(...booksForPrice.map((item: any) => item.price));
  const minPrice = Math.min(...booksForPrice.map((item: any) => item.price));
  const booksAuthors = booksForAuthors.reduce((result: string[], item) => result.concat(item.authors), []);
  const authorsForFilters = authors.filter((item) => booksAuthors.concat(authorsFilter).includes(item.id));


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
          items: authorsForFilters,
          name: "Авторы",
          key: "authors",
          type: "select",
          maxSelect: 10
        },
      ],
      total: books.length,
    }
  }
}