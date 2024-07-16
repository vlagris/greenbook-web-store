import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Index from "@components/Header/components/Search";



describe('Search component', () => {
  it('should return Search component', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <Index/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
  });
});
