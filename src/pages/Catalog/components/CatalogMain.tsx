import React from 'react';
import {Books, FiltersType} from "@/types.ts";
import {QueryParams} from "@/hooks/useQueryParams.ts";
import {CATALOG_CARD_LIMIT} from "@/constants.ts";
import ProductList from "@pages/Catalog/components/ProductList.tsx";
import Pagination from "@components/Pagination";
import Sorting from "@pages/Catalog/components/Sorting.tsx";
import Filters from "@pages/Catalog/components/Filters";
import classes from "@pages/Catalog/styles.module.scss";



interface CatalogMainProps {
  books: Books | null,
  filters: FiltersType | null,
  queryParams: QueryParams,
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>,
}

function CatalogMain({filters, books, queryParams, setQueryParams}: CatalogMainProps) {
  const paginationTotal = books?.total ? Math.ceil(books?.total / CATALOG_CARD_LIMIT) : 1;


  function paginationClick(_: any, page: number) {
    return setQueryParams({...queryParams, page: page.toString()})
  }


  return (
    <div className={classes.main}>
      <Filters
        filters={filters}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />

      <div className={classes.content}>
        <Sorting
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        />

        <ProductList books={books?.items}/>

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