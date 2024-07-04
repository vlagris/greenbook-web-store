import React from "react";
import {Book} from "@/types";
import Card from "@components/Card";
import classes from "./../styles.module.scss";



interface ProductListProps {
  books: Book[] | undefined
}

function ProductList({books}: ProductListProps) {

  return (
      <div className={classes.product_list}>
        {books && books.map((book) =>
          <Card key={book.id} book={book}/>
        )}
      </div>
  );
}

export default ProductList;