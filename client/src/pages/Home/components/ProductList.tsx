import {useEffect} from "react";
import {Book} from "@/types.ts";
import useApi from "@/hooks/useApi.ts";
import Card from "@components/Card";
import Loader from "@components/Loader";
import * as api from "@/services/api";
import classes from "./../styles.module.scss";



function ProductList() {
  const {data, loading, query} = useApi<Book[]>()

  useEffect(() => {
    query(() => api.getBooksRecommended({limit: 40}));
  }, []);

  return (
    <Loader isLoading={loading}>
      <Loader isLoading={loading}>
        <div className={classes.product_list}>
          {data && data.map((book) =>
            <Card key={book.id} book={book}/>
          )}
        </div>
      </Loader>
    </Loader>
  );
}

export default ProductList;