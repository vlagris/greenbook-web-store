import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as genresSelectors from '@/store/genres/selectors.ts';
import Genres from "@pages/Catalog/components/Filter/Genres.tsx";
import {MemoryRouter} from "react-router-dom";

const genre = {
  id: "1",
  name: "name",
  pathName: "pathName",
}

describe('Genres component', () => {
  jest.spyOn(genresSelectors, "genres").mockReturnValue([genre]);

  it('should return Genres', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={[`/catalog/${genre.pathName}`]}>
        <Genres/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});