import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Footer from "@components/Footer";



describe('Footer component', () => {
  it('should return Footer component', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <Footer/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
  });
});
