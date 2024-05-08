import React from 'react';
import {useSearchParams} from "react-router-dom";
import {Books} from "@/types.ts";
import {Filters} from "@pages/Catalog/useFilters.ts";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;


  function paginationClick(_: any, page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }



  return (
    <div className={classes.main}>
      <Filter minPrice={books.minPrice} maxPrice={books.maxPrice} filters={filters} setFilters={setFilters}/>

      <div className={classes.content}>

        <Sorting filters={filters} setFilters={setFilters}/>
        <ProductList books={books.items}/>
        <div className={classes.pagination_wrap}>
          <Pagination total={Math.ceil(books.total / 15)} page={currentPage} onClick={paginationClick}/>
        </div>

      </div>

    </div>
  );
}

export default CatalogMain;