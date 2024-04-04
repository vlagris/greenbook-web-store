import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Search from "@components/Header/Search.tsx";



describe('Search component', () => {
  it('should return Search component', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <Search/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
  });
});
