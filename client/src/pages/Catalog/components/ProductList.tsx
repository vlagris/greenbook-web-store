import Card from "@components/Card";
import {Book} from "@/types.ts";
import Pagination from "@components/Pagination";
import classes from "./../styles.module.scss";


interface ProductListProps {
  books: Book[] | undefined,
}

function ProductList({books}: ProductListProps) {

  return (
    <div className={classes.product_list_wrap}>
      <div className={classes.product_list}>
        {books && books.map((book) =>
          <Card key={book.id} book={book}/>
        )}
      </div>
    </div>
  );
}

export default ProductList;