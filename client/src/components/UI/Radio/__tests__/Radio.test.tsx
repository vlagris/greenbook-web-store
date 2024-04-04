import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import { RadioContext } from "@components/UI/Radio/RadioContext.ts";
import Radio from "@components/UI/Radio/Radio.tsx";



describe('Radio input component', () => {
  it('should return Radio input', () => {
    const component = renderWithProviders(
      <RadioContext.Provider value={{radioId: "", setRadioId: jest.fn}}>
        <Radio name={"radio1"} id={"radio1"} isChecked={true}>children</Radio>
      </RadioContext.Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it('should call SetRadioId', () => {
    const mockedSetRadioId = jest.fn();
    renderWithProviders(
      <RadioContext.Provider value={{radioId: "", setRadioId: mockedSetRadioId}}>
        <Radio name={"radio1"} id={"radio1"}>children</Radio>
      </RadioContext.Provider>
    );

    fireEvent.click(screen.getByText(/children/));
    expect(mockedSetRadioId).toHaveBeenCalled();
    expect(mockedSetRadioId).toHaveBeenCalledWith("radio1");
  });
});
