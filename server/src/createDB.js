import {authorsCollection, genresCollection, booksCollection} from "./data.js";
import {bookModel, genreModel, authorModel} from "./models/index.js";


(async () => {
  const authorsByName = await addAuthorsToDB();
  const genresByName = await addGenresToDB();


  for (let book of booksCollection) {
    const newBook = await bookModel.create({
      title: book.title,
      price: book.price,
      image: book.image,
      rating_rate: book.rating.rate,
      rating_count: book.rating.count,
    });


    for (let genre of book.genre) {
      await newBook.addGenre(genresByName[genre.name])
    }

    for (let author of book.author) {
      await newBook.addAuthor(authorsByName[author.name])
    }
  }

  const book = await bookModel.findOne({
    where: {title: "Институт"},
    include: [
      {
        model: authorModel,
        attributes: []
      },
      {
        model: genreModel,
        attributes: []
      },
    ],
  });

})();


async function addAuthorsToDB() {
  try {
    const authorsByName = {}

    for (let authorKey in authorsCollection) {
      const author = authorsCollection[authorKey];

      authorsByName[author.name] = await authorModel.create({
        name: author.name,
        pathName: author.pathName,
        description: author.description,
        image: author.image,
      });
    }
    return authorsByName;
  } catch (err) {
    console.log(err);
  }
}


async function addGenresToDB() {
  try {
    const genresByName = {}

    for (let genreKey in genresCollection) {
      const genre = genresCollection[genreKey];

      genresByName[genre.name] = await genreModel.create({
        name: genre.name,
        pathName: genre.pathName,
      });
    }
    return genresByName;
  } catch (err) {
    console.log(err);
  }
}
