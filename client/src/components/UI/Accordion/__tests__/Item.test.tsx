import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Item from "@components/UI/Accordion/Item.tsx";



describe('Accordion Item component', () => {
  it('should return Accordion Button', () => {
    const component = renderWithProviders(<Item>children</Item>);

    expect(component).toMatchSnapshot();
  });
});
