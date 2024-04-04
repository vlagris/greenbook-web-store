import {act, fireEvent, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import {ErrorType} from "@/types.ts";
import * as reactRouter from "react-router";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as useFormField from "@/hooks/useFormField.ts";
import  * as authActions from "@/store/auth/actions.ts";
import LoginForm from "@pages/Login/LoginForm.tsx";


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

describe('LoginForm component', () => {
  const mockedUseFormField = jest.spyOn(useFormField, "default");
  jest.spyOn(authActions, "login").mockImplementation();
  const mockedNavigate = jest.fn();
  const mockedUnwrap = jest.fn();
  const mockedDispatch = jest.fn().mockReturnValue({unwrap: mockedUnwrap});
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockedDispatch);
  jest.spyOn(reactRouter, "useNavigate").mockReturnValue(mockedNavigate);

  afterEach(() => {
    mockedFieldIsValid.mockClear();
    mockedSetError.mockClear();
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
    mockedUnwrap.mockClear()
  })


  it('should fail validation before login request', () => {
    mockedUnwrap.mockResolvedValue({});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: false}));
    const component = renderWithProviders(<MemoryRouter initialEntries={["/"]}><LoginForm/></MemoryRouter>);

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByRole("submit"));
    expect(mockedDispatch).not.toHaveBeenCalled();
  });


  it('should successfully send the login request',  async () => {
    mockedUnwrap.mockResolvedValue({});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: true}));
    renderWithProviders(<MemoryRouter initialEntries={["/"]}><LoginForm/></MemoryRouter>);

    await act(async () => fireEvent.click(screen.getByRole("submit")))
    expect(mockedUnwrap).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalled();
  });


  it('should return client error after login request',  async () => {
    mockedUnwrap.mockRejectedValue({type: ErrorType.BAD_REQUEST});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: true}));
    renderWithProviders(<MemoryRouter initialEntries={["/"]}><LoginForm/></MemoryRouter>);

    await act(async () => fireEvent.click(screen.getByRole("submit")))
    expect(mockedSetError).toHaveBeenCalled();
  });


  it('should return server error after login request',  async () => {
    mockedUnwrap.mockRejectedValue({type: ErrorType.SERVER_ERROR});
    mockedUseFormField.mockReturnValue(createFieldReturnValue({isValid: true}));
    renderWithProviders(<MemoryRouter initialEntries={["/"]}><LoginForm/></MemoryRouter>);

    await act(async () => fireEvent.click(screen.getByRole("submit")))
    expect(mockedNavigate).not.toHaveBeenCalled();
    expect(mockedSetError).not.toHaveBeenCalled();
  });
});