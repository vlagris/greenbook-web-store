import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Layout from "@components/Layout";
import * as reactRouterDom from "react-router";



describe('Layout component', () => {
  const mockedOutlet = jest.spyOn(reactRouterDom, "Outlet");

  it('should return the layout from outlet', () => {
    mockedOutlet.mockReturnValue(<div>outlet</div>);
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <Layout/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/outlet/)).toBeInTheDocument();
  });

  it('should return the layout with children', () => {
    mockedOutlet.mockReturnValue(<div>outlet</div>)
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <div>children</div>
        </Layout>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/children/)).toBeInTheDocument();
  });
});
