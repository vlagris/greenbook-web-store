import {useEffect} from "react";
import {Book} from "@/types.ts";
import useApi from "@/hooks/useApi.ts";
import Card from "../../../components/Card";
import Loader from "@components/Loader";
import * as api from "@/services/api";
import classes from "./../styles.module.scss";



function ProductList() {
  const {data, loading, request} = useApi<Book[]>()

  useEffect(() => {
    request(api.getBooksRecommended, {limit: 40})
  }, []);

  return (
    <Loader isLoading={loading}>
      {data&&
        <div className={classes.product_list}>
          {data.map((book) =>
            <Card key={book.id} book={book}/>
          )}
        </div>
      }
    </Loader>


  );
}

export default ProductList;