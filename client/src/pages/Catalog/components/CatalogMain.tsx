import React from 'react';
import {Book, FiltersType} from "@/types";
import {QueryParams} from "@/hooks/useQueryParams.ts";
import {CATALOG_CARD_LIMIT} from "@/constants.ts";
import ProductList from "@pages/Catalog/components/ProductList.tsx";
import Pagination from "@components/Pagination";
import Sorting from "@pages/Catalog/components/Sorting.tsx";
import { FiltersDesktop, FiltersMobile } from "@pages/Catalog/components/Filters";
import classes from "@pages/Catalog/styles.module.scss";



interface CatalogMainProps {
  books: Book[] | undefined,
  filters: FiltersType | undefined,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function CatalogMain({filters, books, queryParams, setQueryParams}: CatalogMainProps) {
  const paginationTotal = filters?.total ? Math.ceil(filters?.total / CATALOG_CARD_LIMIT) : 1;


  function paginationClick(_: any, page: number) {
    return setQueryParams({...queryParams, page: page.toString()})
  }


  return (
    <div className={classes.main}>
      <FiltersDesktop
        filters={filters}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <div className={classes.content}>

        <div className={classes.content_top}>
          <FiltersMobile
            filters={filters}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />

          <Sorting
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />
        </div>

        <ProductList books={books}/>

        <div className={classes.pagination_wrap}>
          <Pagination
            total={paginationTotal}
            page={Number(queryParams.page) || 1}
            onClick={paginationClick}
          />
        </div>
      </div>

    </div>
  );
}

export default CatalogMain;