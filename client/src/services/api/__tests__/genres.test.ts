import { mainApi } from "@/services/api/mainApi.ts";
import { getGenres } from "@/services/api/genres.ts";


const responseError = { error: 'error' };
const genresResponse = [
  { _id: "1", name: "name1", pathName: "pathName1" },
  { _id: "2", name: "name2", pathName: "pathName2" },
];
const genres = [
  { id: "1", name: "name1", pathName: "pathName1" },
  { id: "2", name: "name2", pathName: "pathName2" },
];

describe('genres api', () => {
  const mockedMainApiGet = jest.spyOn(mainApi, "get");

  afterEach(() => {
    mockedMainApiGet.mockClear();
  })

  it('should return genres list from the getGenres request',  async () => {
    mockedMainApiGet.mockResolvedValue({ data: genresResponse });
    const result = await getGenres();

    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/genres/")
    expect(result).toEqual(genres)
  });

  it('should return error from the getGenres request',  async () => {
    mockedMainApiGet.mockRejectedValue(responseError);
    try {
      await getGenres();
    } catch (err) {
      expect(err).toEqual(responseError)
    }
    expect(mockedMainApiGet).toHaveBeenCalled()
    expect(mockedMainApiGet).toHaveBeenCalledWith("/genres/")
  });

});