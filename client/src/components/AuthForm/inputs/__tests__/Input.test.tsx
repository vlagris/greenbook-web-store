import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Input from "@components/AuthForm/inputs/Input.tsx";

describe('AuthForm Input component', () => {
  it('should return AuthForm Input component', () => {
    const component = renderWithProviders(<Input/>);

    expect(component).toMatchSnapshot();
  });

  it('should return AuthForm error Input component', () => {
    const component = renderWithProviders(<Input error={true} errorMessage={"error"}/>);

    expect(component).toMatchSnapshot();
  });
});

