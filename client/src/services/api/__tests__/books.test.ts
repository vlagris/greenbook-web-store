import { mainApi } from "@/services/api/mainApi.ts";
import { getBooksByGenre, getBooksRecommended } from "@/services/api/books.ts";


const bookResponse = {
  _id: "1",
  title: "title",
  price: 10,
  genres: ["genres"],
  authors: ["authors"],
  image: "image",
  rating: {
    rate: 4.5,
    count: 44,
  }
}
const book = {
  id: "1",
  title: "title",
  price: 10,
  genres: ["genres"],
  authors: ["authors"],
  image: "image",
  rating: {
    rate: 4.5,
    count: 44,
  }
}

const responseError = { error: 'error' };


describe('books api', () => {
  const mockedMainApiGet = jest.spyOn(mainApi, "get");

  afterEach(() => {
    mockedMainApiGet.mockClear();
  })

  it('should return books and totalItem from the getBooksByGenre request',  async () => {
    mockedMainApiGet.mockResolvedValue({ data: { items: [bookResponse, bookResponse], totalItems: 10 } });
    const requestData = { pathName: "asd", limit: 2, offset: 0 }
    const result = await getBooksByGenre(requestData);

    expect(result.items).toEqual([book, book])
    expect(result.totalItems).toEqual(10)
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/books/", {params: requestData})
  });

  it('should return error from the getBooksByGenre request',  async () => {
    mockedMainApiGet.mockRejectedValue(responseError);
    const requestData = { pathName: "asd", limit: 2, offset: 0}
    try {
      await getBooksByGenre(requestData);
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/books/", {params: requestData})
  });


  it('should return books from the getBooksRecommended request',  async () => {
    mockedMainApiGet.mockResolvedValue({ data: [bookResponse, bookResponse] });
    const requestData = { limit: 2 }
    const result = await getBooksRecommended(requestData);

    expect(result).toEqual([book, book])
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/books/recommended", {params: requestData})
  });

  it('should return error from the getBooksRecommended request',  async () => {
    mockedMainApiGet.mockRejectedValue(responseError);
    const requestData = { limit: 2 }
    try {
      await getBooksRecommended(requestData);
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/books/recommended", {params: requestData})
  });
});