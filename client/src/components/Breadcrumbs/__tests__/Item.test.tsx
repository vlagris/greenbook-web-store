import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Item from "@components/Breadcrumbs/Item.tsx";



describe('breadcrumbs Item component', () => {
  it('should return Item component', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Item to={"/asd"} crumbName={"name"}/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
