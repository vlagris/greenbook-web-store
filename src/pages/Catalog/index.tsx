import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Genre } from "@/types";
import { CATALOG_CARD_LIMIT } from "@/constants.ts";
import { useGetBooksByGenreMutation, useGetGenresQuery, useGetBooksFiltersMutation } from "@/services/api";
import Loader from "@components/Loader";
import CatalogMain from "@pages/Catalog/components/CatalogMain.tsx";
import CatalogBreadcrumbs from "@pages/Catalog/components/CatalogBreadcrumbs.tsx";
import useQueryParams from "@/hooks/useQueryParams.ts";
import CatalogHeader from "@pages/Catalog/components/CatalogHeader.tsx";



function Catalog() {
  const {queryParams, setQueryParams, queryLoading} = useQueryParams(
    ["page", "sort", "price", "authors"]
  );
  const {pathName} = useParams();
  const { data: genres } = useGetGenresQuery();
  const [genre, setGenre] = useState<Genre>();
  const [getBooksByGenres, booksResult] = useGetBooksByGenreMutation();
  const [getBooksFilters, filtersResult] = useGetBooksFiltersMutation();

  useEffect(() => {
    if (pathName && genres) {
      setGenre(genres.find(genre => genre.pathName === pathName));
    }
  }, [genres, pathName]);


  useEffect(() => {
    if(!pathName || queryLoading) {
      return;
    }
    const {page, ...otherFiltersParams} = queryParams;
    const offset = ((Number(page) || 1) - 1) * CATALOG_CARD_LIMIT

    getBooksByGenres({
      pathName,
      offset,
      limit: CATALOG_CARD_LIMIT,
      ...otherFiltersParams
    })
    getBooksFilters({
      pathName,
      price: queryParams.price || undefined,
      authors: queryParams.authors || undefined
    })
  }, [queryLoading, queryParams, pathName]);


  return (
    <Loader
      isLoading={booksResult.isLoading}
      loaded={booksResult.isSuccess}
      error={booksResult.error}
    >
      <div className="container">
        <CatalogBreadcrumbs
          genres={genres}
          pathName={pathName}
        />

        <CatalogHeader
          title={genre?.name}
          total={filtersResult.data?.total}
        />

        <CatalogMain
          books={booksResult.data}
          filters={filtersResult.data}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />
      </div>
    </Loader>
  );
}

export default Catalog;