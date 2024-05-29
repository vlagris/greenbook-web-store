import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as Genres from "@pages/Catalog/components/Filter/Genres.tsx";
import * as Price from "@pages/Catalog/components/Filter/Price.tsx";
import Filter from "@pages/Catalog/components/Filter";



describe('Filter component', () => {
  const mockedGenres = jest.spyOn(Genres, "default").mockReturnValue(<div>Genres</div>);
  const mockedPrice = jest.spyOn(Price, "default").mockReturnValue(<div>Price</div>);

  it('should return Filter', () => {
    const component = renderWithProviders(<Filter/>);

    expect(component).toMatchSnapshot();
    expect(mockedGenres).toHaveBeenCalled();
    expect(mockedPrice).toHaveBeenCalledWith({priceMin: 100, priceMax: 10000}, {});
  });
});