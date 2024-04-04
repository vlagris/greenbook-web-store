import {act, fireEvent, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import {ErrorType} from "@/types.ts";
import * as reactRouter from "react-router";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as useFormField from "@/hooks/useFormField.ts";
import * as authActions from "@/store/auth/actions.ts";
import RegisterForm from "@pages/Signup/RegisterForm.tsx";


const mockedFieldIsValid = jest.fn();
const mockedSetError = jest.fn();

function createFieldReturnValue({isValid}: {isValid: boolean}) {
  return {
    value: "",
    setValue: jest.fn(),
    error: false,
    setError: mockedSetError,
    isValid: mockedFieldIsValid.mockReturnValue(isValid),
    onChange: jest.fn(),
    onBlur: jest.fn(() => true)
  }
}

describe('RegisterForm component', () => {
  const mockedUseFormField = jest.spyOn(useFormField, "default");
  jest.spyOn(authActions, "register").mockImplementation();
  const mockedUnwrap = jest.fn();
  const mockedDispatch = jest.fn().mockReturnValue({unwrap: mockedUnwrap});
  const mockedNavigate = jest.fn();
  jest.spyOn(reactRouter, "useNavigate").mockReturnValue(mockedNavigate);
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockedDispatch);

  afterEach(() => {
    mockedSetError.mockClear();
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
    mockedUnwrap.mockClear()
  })


  it('should call validation', () => {
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: false}));
    const component = renderWithProviders(<MemoryRouter initialEntries={["/"]}><RegisterForm/></MemoryRouter>);

    expect(component).toMatchSnapshot();

    const emailValidate = mockedUseFormField.mock.calls[0][0].validate;
    const passValidate = mockedUseFormField.mock.calls[1][0].validate;
    const confirmPassValidate = mockedUseFormField.mock.calls[2][0].validate;

    if (emailValidate) {
      expect(emailValidate("asd")).toBeFalsy();
    }
    if (passValidate) {
      expect(passValidate("123")).toBeFalsy();
    }
    if (confirmPassValidate) {
      expect(confirmPassValidate("123")).toBeFalsy();
    }
  });


  it('should fail validation before register request', () => {
    mockedUnwrap.mockResolvedValue({});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: false}));
    const component = renderWithProviders(<MemoryRouter initialEntries={["/"]}><RegisterForm/></MemoryRouter>);

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByRole("submit"));
    expect(mockedDispatch).not.toHaveBeenCalled();
  });


  it('should successfully send the register request',  async () => {
    mockedUnwrap.mockResolvedValue({});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: true}));
    renderWithProviders(<MemoryRouter initialEntries={["/"]}><RegisterForm/></MemoryRouter>);

    await act(async () => fireEvent.click(screen.getByRole("submit")))
    expect(mockedUnwrap).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalled();
  });


  it('should return client error after register request',  async () => {
    mockedUnwrap.mockRejectedValue({type: ErrorType.BAD_REQUEST});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: true}));
    renderWithProviders(<MemoryRouter initialEntries={["/"]}><RegisterForm/></MemoryRouter>);

    await act(async () => fireEvent.click(screen.getByRole("submit")))
    expect(mockedSetError).toHaveBeenCalled();
  });


  it('should return server error after register request',  async () => {
    mockedUnwrap.mockRejectedValue({type: ErrorType.SERVER_ERROR});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: true}));
    renderWithProviders(<MemoryRouter initialEntries={["/"]}><RegisterForm/></MemoryRouter>);

    await act(async () => fireEvent.click(screen.getByRole("submit")))
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(mockedSetError).not.toHaveBeenCalled();
  });
});