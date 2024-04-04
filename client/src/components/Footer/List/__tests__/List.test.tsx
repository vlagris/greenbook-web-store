import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import List from "@components/Footer/List/List.tsx";



describe('List component', () => {
  it('should return List component', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <List><div/></List>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
