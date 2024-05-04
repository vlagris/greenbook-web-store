import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {Books, Genre} from "@/types.ts";
import * as api from "@/services/api";

import Breadcrumbs, {Crumb} from "@components/Breadcrumbs";
import useApi from "@/hooks/useApi.ts";
import Loader from "@components/Loader";
import CatalogMain from "@pages/Catalog/components/CatalogMain.tsx";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { genresSelectors } from "@/store/genres";
import classes from "./styles.module.scss";


const LIMIT = 15;
function Catalog() {
  const genres = useAppSelector(genresSelectors.genres);
  const [genre, setGenre] = useState<Genre>();
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const {data, error, loading, query} = useApi<Books>();
  const {pathName} = useParams();
  const [searchParams] = useSearchParams();


  useEffect(() => {
    const currentGenre = genres.find(genre => genre.pathName === pathName);
    if (currentGenre) {
      setGenre(currentGenre);
      setCrumbs([{name: currentGenre.name, pathName: currentGenre.pathName}]);
    }
  }, [genres, pathName]);


  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    const offset = (page - 1) * LIMIT;

    if(pathName) {
      query(() => api.getBooksByGenre({pathName: pathName, limit: LIMIT, offset}));
    }
  }, [pathName, searchParams]);



  return (
    <main>
      <Loader isLoading={loading} error={error}>
        {data &&
          <div className="container">
            <Breadcrumbs crumbs={crumbs}/>

            <div className={classes.title_wrap}>
              <h2 className={classes.title}>{genre?.name}</h2>
              {data.totalItems !== 0 &&
                <span className={classes.books_count}>{data.totalItems} книг</span>
              }
            </div>

            <CatalogMain books={data} limit={LIMIT}/>
          </div>
        }
      </Loader>
    </main>
  );
}

export default Catalog;