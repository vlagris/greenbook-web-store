import { useEffect, useState } from "react";
import {Books, Genre} from "@/types.ts";
import {CATALOG_CARD_LIMIT} from "@/constants.ts";
import * as api from "@/services/api";

import useApi from "@/hooks/useApi.ts";
import Loader from "@components/Loader";
import CatalogMain from "@pages/Catalog/components/CatalogMain.tsx";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { genresSelectors } from "@/store/genres";
import CatalogBreadcrumbs from "@pages/Catalog/components/CatalogBreadcrumbs.tsx";
import useFilters from "@pages/Catalog/useFilters.ts";
import {useParams} from "react-router-dom";
import CatalogHeader from "@pages/Catalog/components/CatalogHeader.tsx";



function Catalog() {
  const genres = useAppSelector(genresSelectors.genres);
  const [genre, setGenre] = useState<Genre>();
  const {filters, setFilters, filtersParams, filtersLoading} = useFilters();
  const {data: booksData, error, loading, query} = useApi<Books>();
  const {pathName} = useParams();


  useEffect(() => {
    if (!genres) {
      return;
    }
    const currentGenre = genres.find(genre => genre.pathName === pathName);
    setGenre(currentGenre);
  }, [genres, pathName]);


  useEffect(() => {
    if(!pathName || filtersLoading) {
      return;
    }
    const {page, ...otherFiltersParams} = filtersParams;
    const offset = ((Number(page) || 1) - 1) * CATALOG_CARD_LIMIT

    query(() => api.getBooksByGenre({
      pathName,
      offset,
      limit: CATALOG_CARD_LIMIT,
      ...otherFiltersParams
    }));
  }, [filtersLoading, filtersParams, pathName]);



  return (
    <main>
      <Loader isLoading={loading} error={error}>
        {booksData &&
          <div className="container">
            <CatalogBreadcrumbs
              genres={genres}
              pathName={pathName}
            />

            <CatalogHeader
              title={genre?.name}
              total={booksData.total}
            />

            <CatalogMain
              books={booksData}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        }
      </Loader>
    </main>
  );
}

export default Catalog;