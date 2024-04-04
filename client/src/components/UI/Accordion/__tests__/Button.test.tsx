import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import { ItemContext } from "@components/UI/Accordion/ItemContext.ts";
import Button from "@components/UI/Accordion/Button.tsx";



describe('Accordion Button component', () => {
  const mockedSetShow = jest.fn();

  it('should return Accordion Button', () => {
    const component = renderWithProviders(
      <ItemContext.Provider value={{ show: false, setShow: mockedSetShow }}>
        <Button>children</Button>
      </ItemContext.Provider>
    );

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByText(/children/));
    expect(mockedSetShow).toHaveBeenCalled();
    expect(mockedSetShow).toHaveBeenCalledWith(true);
  });
});
