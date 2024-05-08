import { useEffect, useState } from "react";
import {Books, Genre} from "@/types.ts";
import {GetBooksByGenre} from "@/services/api";
import * as api from "@/services/api";

import useApi from "@/hooks/useApi.ts";
import Loader from "@components/Loader";
import CatalogMain from "@pages/Catalog/components/CatalogMain.tsx";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { genresSelectors } from "@/store/genres";
import CatalogBreadcrumbs from "@pages/Catalog/components/CatalogBreadcrumbs.tsx";
import useFilters from "@pages/Catalog/useFilters.ts";
import {useParams} from "react-router-dom";
import classes from "./styles.module.scss";



const LIMIT = 15;
function Catalog() {
  const genres = useAppSelector(genresSelectors.genres);
  const [genre, setGenre] = useState<Genre>();
  const {data: booksData, error, loading, query} = useApi<Books>();
  const {filters, setFilters, filtersParams, filtersLoading} = useFilters();
  const {pathName} = useParams();


  useEffect(() => {
    const currentGenre = genres.find(genre => genre.pathName === pathName);
    if (currentGenre) {
      setGenre(currentGenre);
    }
  }, [genres, pathName]);


  useEffect(() => {
    if(!pathName || filtersLoading) {
      return;
    }
    const {page, ...newFiltersParams} = filtersParams;
    const apiParams: GetBooksByGenre = {
      pathName,
      limit: LIMIT,
      offset: ((Number(page) || 1) - 1) * LIMIT
    }

    query(() => api.getBooksByGenre(Object.assign(apiParams, newFiltersParams)));
  }, [filtersLoading, filtersParams, pathName]);



  return (
    <main>
      <Loader isLoading={loading} error={error}>
        {booksData &&
          <div className="container">
            <CatalogBreadcrumbs genres={genres} pathName={pathName}/>

            <div className={classes.title_wrap}>
              <h2 className={classes.title}>{genre?.name}</h2>
              {booksData.total !== 0 &&
                <span className={classes.books_count}>{booksData.total} книг</span>
              }
            </div>

            <CatalogMain books={booksData} filters={filters} setFilters={setFilters}/>
          </div>
        }
      </Loader>
    </main>
  );
}

export default Catalog;