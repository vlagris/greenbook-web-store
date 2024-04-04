import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Button from "@components/AuthForm/Button";


describe('AuthForm Button component', () => {
  it('should return AuthForm Button component', () => {
    const component = renderWithProviders(<Button>asd</Button>);

    expect(component).toMatchSnapshot();
  });
});
