import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Title from "@components/Footer/List/Title.tsx";



describe('Title component', () => {
  it('should return Title component', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Title><div/></Title>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
