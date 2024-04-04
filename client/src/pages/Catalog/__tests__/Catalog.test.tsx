import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as reactRouterDom from "react-router-dom";
import * as reactRouter from "react-router";
import * as genresSelectors from "@/store/genres/selectors.ts";
import * as useApi from "@/hooks/useApi.ts";
import * as Breadcrumbs from "@components/Breadcrumbs";
import * as Filter from "@pages/Catalog/components/Filter";
import * as ProductList from "@pages/Catalog/components/ProductList.tsx";
import Catalog from "@pages/Catalog";


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

const books = {
  items: [book],
  totalItems: 10
}

const genre = {
  id: "asdasdasd",
  name: "name",
  pathName: "pathName"
}

describe('Catalog component', () => {
  const mockedBreadcrumbs = jest.spyOn(Breadcrumbs, "default").mockReturnValue(<div>breadcrumbs</div>);
  const mockedProductList = jest.spyOn(ProductList, "default").mockReturnValue(<div>product list</div>);
  jest.spyOn(Filter, "default").mockReturnValue(<div>filter</div>);
  jest.spyOn(reactRouter, "useParams").mockReturnValue({pathName: genre.pathName})
  jest.spyOn(reactRouterDom, "useSearchParams").mockReturnValue([new URLSearchParams(), jest.fn()])
  jest.spyOn(genresSelectors, "genres").mockReturnValue([genre]);
  jest.spyOn(useApi, "default").mockReturnValue({
    data: books,
    error: null,
    loading: false,
    query: jest.fn()
  });

  it('should return Catalog', () => {
    const component = renderWithProviders(<Catalog/>);

    expect(component).toMatchSnapshot();
    expect(mockedBreadcrumbs).toHaveBeenCalledWith({crumbs: [{name: genre.name, pathName: genre.pathName}]}, {});
    expect(mockedProductList).toHaveBeenCalledWith({books: books.items, totalPages: 1}, {});
  });
});