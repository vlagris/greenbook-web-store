import {MemoryRouter} from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import NotFound from "@pages/Error/NotFound.tsx";


describe('NotFound component', () => {
  it('should return NotFound', () => {
    const component = renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <NotFound/>
    </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});