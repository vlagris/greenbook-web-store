import fs from "node:fs";


const booksId = "7930077 6372706 6134312 0664415 4988170 5051742 3142994 8565313 7154902 0336015 9271423 3488373 6628298 2879937 2898661 3785370 7660066 4393202 0117617 0599850 6930301 1910613 4568204 9001969 3327191 4251348 3388576 2868281 5731423 1280733 5181315 0070102 7040083 5639705 3274256 8687829 5481107 8137432 6330375 3770730 0193472 8051667 2134830 4976584 8122362 6512269 4163370 9863335 0076360 9657907 2942140 2401768"
const booksIdArray = booksId.split(" ")

const booksJson = fs.readFileSync(
  "./src/server-imitation/db/books.json",
  { encoding: "utf-8" }
);
const books = JSON.parse(booksJson);


const newBooks = books.map((book, index) => {
  book.id = booksIdArray[index]
   return book;
})

fs.writeFileSync(
  "./src/server-imitation/db/books.json",
  JSON.stringify(newBooks),
  { encoding: "utf-8" }
);

