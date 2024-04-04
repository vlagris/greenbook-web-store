import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Item from "@components/Footer/List/Item.tsx";



describe('list Item component', () => {
  it('should return list Item component', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Item><div/></Item>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
