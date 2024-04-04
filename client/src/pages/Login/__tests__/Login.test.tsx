import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as LoginForm from "@pages/Login/LoginForm.tsx";
import Login from "@pages/Login";


describe('Login component', () => {
  const mockedLoginForm = jest.spyOn(LoginForm, "default").mockReturnValue(<div>login form</div>)

  it('should return Login', () => {
    const component = renderWithProviders(<Login/>);

    expect(component).toMatchSnapshot();
    expect(mockedLoginForm).toHaveBeenCalled();
  });
});