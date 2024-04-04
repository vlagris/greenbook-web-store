import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as Card from "@components/Card";
import ProductList from "@pages/Home/components/ProductList.tsx";
import * as useApi from "@/hooks/useApi.ts";


const book = {
  id: "asd1",
  title: "title",
  price: 10,
  genres: ["genres"],
  authors: ["authors"],
  image: "image",
  rating: {
    rate: 4.5,
    count: 44,
  }
}

describe('Home ProductList component', () => {
  const mockedCard = jest.spyOn(Card, "default").mockReturnValue(<div>Card</div>)
  jest.spyOn(useApi, "default").mockReturnValue({
    data: [book],
    error: null,
    loading: false,
    query: jest.fn()
  })

  it('should return ProductList', () => {
    const component = renderWithProviders(<ProductList/>);

    expect(component).toMatchSnapshot();
    expect(mockedCard).toHaveBeenCalledWith({book: book}, {});
  });
});