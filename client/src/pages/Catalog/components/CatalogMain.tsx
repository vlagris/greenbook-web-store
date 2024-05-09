import React from 'react';
import {useSearchParams} from "react-router-dom";
import {Books} from "@/types.ts";
import {Filters} from "@pages/Catalog/useFilters.ts";
import {CATALOG_CARD_LIMIT} from "@/constants.ts";
import Filter from "@pages/Catalog/components/Filter";
import ProductList from "@pages/Catalog/components/ProductList.tsx";
import Pagination from "@components/Pagination";
import Sorting from "@pages/Catalog/components/Sorting.tsx";
import classes from "@pages/Catalog/styles.module.scss";


interface CatalogMainProps {
  books: Books,
  filters: Filters,
  setFilters:  React.Dispatch<React.SetStateAction<Filters>>,
}

function CatalogMain({books, filters, setFilters}: CatalogMainProps) {
  const paginationTotal = Math.ceil(books.total / CATALOG_CARD_LIMIT);


  const paginationClick = (_: any, page: number) => setFilters({...filters, page});


  return (
    <div className={classes.main}>
      <Filter
        minPrice={books.minPrice}
        maxPrice={books.maxPrice}
        filters={filters}
        setFilters={setFilters}
      />

      <div className={classes.content}>
        <Sorting
          filters={filters}
          setFilters={setFilters}
        />
        <ProductList books={books.items}/>
        <div className={classes.pagination_wrap}>
          <Pagination
            total={paginationTotal}
            page={filters.page || 1}
            onClick={paginationClick}
          />
        </div>
      </div>

    </div>
  );
}

export default CatalogMain;