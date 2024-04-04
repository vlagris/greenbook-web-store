import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import {MemoryRouter} from "react-router-dom";
import EmptyCart from "@pages/Cart/components/EmptyCart.tsx";



describe('EmptyCart component', () => {
  it('should return emptyCart', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <EmptyCart/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});