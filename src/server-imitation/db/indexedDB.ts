import {openDB} from 'idb';
import genresData from "./genres.json";
import authorsData from "./authors.json";
import booksData from "./books.json";


const name = "GBDatabaseGP";
const version = 1;

export const db = await openDB(name, version, {
  upgrade:(db) => {
    const genresStore = db.createObjectStore("genres", { keyPath: "id" });
    genresStore.createIndex("pathName", "pathName", { unique: false });
    db.createObjectStore("authors", { keyPath: "id" });
    const booksStore = db.createObjectStore("books", { keyPath: "id" });
    booksStore.createIndex("genres", "genres", { unique: false, multiEntry: true });
    booksStore.createIndex("authors", "authors", { unique: false, multiEntry: true });
    booksStore.createIndex("price", "price", {unique: false});
    const userStore = db.createObjectStore("users", { keyPath: "id" });
    userStore.createIndex("email", "email", { unique: true });
    db.createObjectStore("userSessions", { keyPath: "id" });
    const cartStore = db.createObjectStore("carts", { keyPath: "id" });
    cartStore.createIndex("userId", "userId", { unique: false })
  }
})

await addDefaultGenresToStorage();
await addDefaultAuthorsToStorage();
await addDefaultBooksToStorage();



// type StoreNames = "genres" | "authors" | "books" | "user" | "userSessions" | "cart";
// type modes = "readwrite" | "readonly" ;


// export async function useIndexedRequest(
//   storeName: StoreNames,
//   mode: modes ,
//   request: (store: IDBObjectStore) => IDBRequest
// ) {
//   return new Promise(
//     function(resolve, reject) {
//       const transaction = db.transaction(storeName, mode);
//       const store = transaction.objectStore(storeName);
//       const requestResult = request(store);
//
//       requestResult.onerror = () => {
//         reject(Error(`${storeName} transaction error`));
//       };
//
//       requestResult.onsuccess = () => {
//         resolve(requestResult.result)
//       };
//     }
//   );
// }



async function addDefaultGenresToStorage() {
  const genresCount = await db.count("genres");

  if (genresCount !== 0) {
    return
  }
  for (let genresDataKey in genresData) {
    await db.add("genres", {
      ...genresData[genresDataKey],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}


async function addDefaultAuthorsToStorage() {
  const authorsCount = await db.count("authors");

  if (authorsCount !== 0) {
    return
  }
  for (let authorsDataKey in authorsData) {
    await db.add("authors", {
      ...authorsData[authorsDataKey],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}


async function addDefaultBooksToStorage() {
  const booksCount = await db.count("books");

  if (booksCount !== 0) {
    return;
  }
  for (let booksDataKey in booksData) {
    const { rating, ...newItem } = booksData[booksDataKey];
    await db.add("books", {
      ...newItem,
      rating_rate: rating.rate,
      rating_count: rating.count,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
}
