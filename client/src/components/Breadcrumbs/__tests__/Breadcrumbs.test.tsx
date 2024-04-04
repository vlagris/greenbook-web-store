import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import Breadcrumbs from "@components/Breadcrumbs";



const crumbs = [
  { name: "name", pathName: "pathName" },
  { name: "name2", pathName: "pathName2" },
]

describe('Breadcrumbs component', () => {
  it('should return Breadcrumbs component', () => {
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Breadcrumbs crumbs={crumbs}/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
  });
});
