import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import Order from "@pages/Cart/components/Order.tsx";



describe('Order component', () => {
  it('should return Order', () => {
    const component = renderWithProviders(<Order total={50}/>);

    expect(component).toMatchSnapshot();
  });
});