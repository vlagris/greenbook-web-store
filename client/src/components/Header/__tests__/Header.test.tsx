import {MemoryRouter} from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Header from "@components/Header";



describe('Header component', () => {
  it('should return header', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <Header/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
  });
});
