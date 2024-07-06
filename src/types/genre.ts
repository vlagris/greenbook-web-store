export type Genre = {
  id: string,
  name: string,
  pathName: string,
}

export type GenreResponse = {
  id: string,
  name: string,
  pathName: string,
};

export type GenresState = {
  items: Genre[],
}