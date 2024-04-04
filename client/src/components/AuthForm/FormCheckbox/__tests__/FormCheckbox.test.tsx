import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import FormCheckbox from "@components/AuthForm/FormCheckbox";

describe('AuthForm FormCheckbox component', () => {
  it('should return AuthForm FormCheckbox component', () => {
    const component = renderWithProviders(<FormCheckbox>asd</FormCheckbox>);

    expect(component).toMatchSnapshot();
  });
});

