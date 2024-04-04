import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as Card from "@components/Card";
import * as Pagination from "@components/Pagination";
import ProductList from "@pages/Catalog/components/ProductList.tsx";


const book = {
  id: "q1q1q1q1",
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


describe('ProductList component', () => {
  const mockedCard = jest.spyOn(Card, "default").mockReturnValue(<div>card</div>);
  const mockedPagination = jest.spyOn(Pagination, "default").mockReturnValue(<div>pagination</div>);

  it('should return ProductList', () => {
    const component = renderWithProviders(<ProductList books={[book]} totalPages={1}/>);

    expect(component).toMatchSnapshot();
    expect(mockedCard).toHaveBeenCalledWith({book: book}, {});
    expect(mockedPagination).toHaveBeenCalledWith({totalPages: 1}, {});
  });
});