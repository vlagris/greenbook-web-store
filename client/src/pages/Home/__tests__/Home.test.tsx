import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as ProductList from "@pages/Home/components/ProductList.tsx";
import Home from "@pages/Home";


describe('Home page component', () => {
  const mockedProductList = jest.spyOn(ProductList, "default").mockReturnValue(<div>product list</div>)
  it('should return Home', () => {
    const component = renderWithProviders(<Home/>);

    expect(component).toMatchSnapshot();
    expect(mockedProductList).toHaveBeenCalled();
  });
});