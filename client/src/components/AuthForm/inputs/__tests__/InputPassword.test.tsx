import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import InputPassword from "@components/AuthForm/inputs/InputPassword.tsx";

describe('AuthForm InputPassword component', () => {
  it('should return AuthForm InputPassword component', () => {
    const component = renderWithProviders(<InputPassword/>);

    expect(component).toMatchSnapshot();
  });

  it('should return AuthForm error InputPassword component', () => {
    const component = renderWithProviders(<InputPassword error={true} errorMessage={"error"}/>);

    expect(component).toMatchSnapshot();
  });

  it('should return InputPassword component with a visible password', () => {
    const component = renderWithProviders(<InputPassword placeholder="Password"/>);

    fireEvent.click(screen.getByTestId("toggleVisibility"))
    expect(screen.getByPlaceholderText("Password").getAttribute("type")).toEqual("text");

    expect(component).toMatchSnapshot();
  });
});

