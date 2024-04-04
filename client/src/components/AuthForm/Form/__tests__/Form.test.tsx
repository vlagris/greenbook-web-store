import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Form from "@components/AuthForm/Form";
import {fireEvent, screen} from "@testing-library/react";
import React from "react";


describe('AuthForm Form component', () => {
  it('should return AuthForm Form component', () => {
    const mockedOnSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    });
    const component = renderWithProviders(
      <Form title={"form"} onSubmit={mockedOnSubmit}>
        <button>submit</button>
      </Form>
    );

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByText(/submit/));
    expect(mockedOnSubmit).toHaveBeenCalled();
  });
});
