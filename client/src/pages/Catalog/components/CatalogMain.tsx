import React from 'react';
import {Books} from "@/types.ts";
import Filter from "@pages/Catalog/components/Filter";
import ProductList from "@pages/Catalog/components/ProductList.tsx";
import Pagination from "@components/Pagination";
import {CustomSelect, SelectItem} from "@components/UI/CustomSelect"
import classes from "@pages/Catalog/styles.module.scss";


function CatalogMain({books, limit}: { books: Books, limit: number }) {


  return (
    <div className={classes.main}>
      <Filter/>

      <div className={classes.content}>

        <div className={classes.sorting}>
          <CustomSelect placeholder={"Сортировать"}>
            <SelectItem id={1} value={"Популярные"} active>Популярные</SelectItem>
            <SelectItem id={2} value={"Высокий рейтинг"}>Высокий рейтинг</SelectItem>
            <SelectItem id={3} value={"Сначала дешёвые"}>Сначала дешёвые</SelectItem>
            <SelectItem id={4} value={"Сначала дорогии"}>Сначала дорогии</SelectItem>
          </CustomSelect>
        </div>

        <ProductList books={books.items}/>

        <div className={classes.pagination_wrap}>
          <Pagination totalPages={Math.ceil(books.totalItems / limit)}/>
        </div>

      </div>

    </div>
  );
}

export default CatalogMain;