import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import { ItemContext } from "@components/UI/Accordion/ItemContext.ts";
import Icon from "@components/UI/Accordion/Icon.tsx";



describe('Accordion Icon component', () => {
  it('should return show Accordion Icon', () => {
    const component = renderWithProviders(
      <ItemContext.Provider value={{ show: true, setShow: () => {} }}>
        <Icon/>
      </ItemContext.Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it('should return not show Accordion Icon', () => {
    const component = renderWithProviders(
      <ItemContext.Provider value={{ show: false, setShow: () => {} }}>
        <Icon/>
      </ItemContext.Provider>
    );

    expect(component).toMatchSnapshot();
  });
});
