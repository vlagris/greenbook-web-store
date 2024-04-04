import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as RegisterForm from "@pages/Signup/RegisterForm.tsx";
import Signup from "@pages/Signup";


describe('RegisterForm component', () => {
  const mockedRegisterForm = jest.spyOn(RegisterForm, "default").mockReturnValue(<div>register form</div>)

  it('should return RegisterForm', () => {
    const component = renderWithProviders(<Signup/>);

    expect(component).toMatchSnapshot();
    expect(mockedRegisterForm).toHaveBeenCalled();
  });
});