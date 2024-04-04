import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import { ItemContext } from "@components/UI/Accordion/ItemContext.ts";
import Content from "@components/UI/Accordion/Content.tsx";



describe('Accordion Content component', () => {
  it('should return show Accordion Content children', () => {
    const component = renderWithProviders(
      <ItemContext.Provider value={{ show: true, setShow: jest.fn() }}>
        <Content>children</Content>
      </ItemContext.Provider>
    );

    expect(component).toMatchSnapshot();
    expect(screen.getByText(/children/).style.maxHeight).toEqual("0px");
  });

  it('should return not show Accordion Content children', () => {
    const component = renderWithProviders(
      <ItemContext.Provider value={{ show: false, setShow: jest.fn() }}>
        <Content>children</Content>
      </ItemContext.Provider>
    );

    expect(component).toMatchSnapshot();
    expect(screen.getByText(/children/).style.maxHeight).toEqual("0");
  });
});
