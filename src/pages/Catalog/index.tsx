import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {Books, FiltersType, Genre} from "@/types.ts";
import {CATALOG_CARD_LIMIT} from "@/constants.ts";
import * as api from "@/services/api";
import useApi from "@/hooks/useApi.ts";
import Loader from "@components/Loader";
import CatalogMain from "@pages/Catalog/components/CatalogMain.tsx";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { genresSelectors } from "@/store/genres";
import CatalogBreadcrumbs from "@pages/Catalog/components/CatalogBreadcrumbs.tsx";
import useQueryParams from "@/hooks/useQueryParams.ts";
import CatalogHeader from "@pages/Catalog/components/CatalogHeader.tsx";



function Catalog() {
  const {pathName} = useParams();
  const genres = useAppSelector(genresSelectors.genres);
  const [genre, setGenre] = useState<Genre>();
  const books = useApi<Books>();
  const filters = useApi<FiltersType>();
  const {queryParams, setQueryParams, queryLoading} = useQueryParams(
    ["page", "sort", "price", "authors"]
  );


  useEffect(() => {
    if (!pathName || !genres) {
      return;
    }
    const currentGenre = genres.find(genre => genre.pathName === pathName);
    setGenre(currentGenre);
  }, [genres, pathName]);


  useEffect(() => {
    if(!pathName || queryLoading) {
      return;
    }
    const {page, ...otherFiltersParams} = queryParams;
    const offset = ((Number(page) || 1) - 1) * CATALOG_CARD_LIMIT

    books.apiQuery(() => api.getBooksByGenre({
      pathName,
      offset,
      limit: CATALOG_CARD_LIMIT,
      ...otherFiltersParams
    }));
  }, [queryLoading, queryParams, pathName]);


  useEffect(() => {
    if(!pathName) {
      return;
    }
    filters.apiQuery(() => api.getBooksFilters({pathName}));
  }, [pathName]);



  return (
    <main>
      <Loader isLoading={books.loading} error={books.error} data={!!books.data}>
        {books.data && filters.data &&
          <div className="container">
            <CatalogBreadcrumbs
              genres={genres}
              pathName={pathName}
            />

            <CatalogHeader
              title={genre?.name}
              total={books.data.total}
            />

            <CatalogMain
              books={books.data}
              filters={filters.data}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
          </div>
        }
      </Loader>
    </main>
  );
}

export default Catalog;