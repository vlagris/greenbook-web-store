import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as ErrorPage from "@pages/Error";
import Loader from "@components/Loader";
import {ErrorType} from "@/types.ts";



describe('Loader component', () => {

  it('should return the loader in loading state', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Loader isLoading={true}><div>children</div></Loader>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeNull();
  });

  it('should return the children', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Loader isLoading={false}><div>children</div></Loader>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeInTheDocument();
  });

  it('should return the errorPage', () => {
    jest.spyOn(ErrorPage, "default").mockReturnValue(<div>error</div>);
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Loader isLoading={false} error={{type: ErrorType.NOT_FOUND }}><div>children</div></Loader>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeNull();
    expect(screen.queryByText(/error/)).toBeInTheDocument();
  });
});
