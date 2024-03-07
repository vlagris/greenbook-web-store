import React, {useEffect, useState} from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {Books, Genre} from "@/types.ts";
import * as api from "@/services/api";

import Breadcrumbs, {Crumb} from "@components/Breadcrumbs";
import Filter from "@pages/Catalog/components/Filter";
import ProductList from "@pages/Catalog/components/ProductList.tsx";
import useApi from "@/hooks/useApi.ts";
import Loader from "@components/Loader";
import classes from "./styles.module.scss";
import {useAppSelector} from "@/hooks/useTypedReduxHooks.ts";
import {selectGenres} from "@/store/genres/genres.slice.ts";


const LIMIT = 15;
function Catalog() {
  const genres = useAppSelector(selectGenres);
  const [genre, setGenre] = useState<Genre>();
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const {data, error, loading, request} = useApi<Books>();
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

    request(api.getBooksByGenre, {pathName, limit: LIMIT, offset});
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

            <div className={classes.main}>
              <Filter/>
              <ProductList books={data.items} totalPages={Math.ceil(data.totalItems / LIMIT)}/>
            </div>

            </div>
        }
      </Loader>
    </main>
  );
}

export default Catalog;