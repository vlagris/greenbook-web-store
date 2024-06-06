import Card from "@components/Card";
import {Book} from "@/types.ts";
import classes from "./../styles.module.scss";


interface ProductListProps {
  books: Book[],
}

function ProductList({books}: ProductListProps) {

  return (
    <div className={classes.product_list_wrap}>
      <div className={classes.product_list}>
        {books.map((book) =>
          <Card key={book.id} book={book}/>
        )}
      </div>
    </div>
  );
}

export default ProductList;