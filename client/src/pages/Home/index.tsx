import {useEffect} from "react";
import {Book} from "@/types.ts";
import useApi from "@/hooks/useApi.ts";
import * as api from "@/services/api";
import ProductList from "@pages/Home/components/ProductList.tsx";
import Loader from "@components/Loader";



function Home() {
  const {data, loaded, apiQuery} = useApi<Book[]>();


  useEffect(() => {
    apiQuery(() => api.getBooksRecommended({limit: 40}));
  }, []);


  return (
    <main>
      <div className="container">
        <Loader loaded={loaded}>
          <ProductList books={data}/>
        </Loader>
      </div>
    </main>
);
}

export default Home;