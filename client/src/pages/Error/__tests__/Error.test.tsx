import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as NotFound from "@pages/Error/NotFound.tsx";
import Error from "@pages/Error";



describe('Error component', () => {
  const mockedNotFound = jest.spyOn(NotFound, "default").mockReturnValue(<div>not found</div>);

  it('should return Error', () => {
    const component = renderWithProviders(<Error/>);

    expect(component).toMatchSnapshot();
    expect(mockedNotFound).toHaveBeenCalled();
  });
});