import { useGetBooksRecommendedQuery } from "@/services/api";
import ProductList from "@pages/Home/components/ProductList.tsx";
import Loader from "@components/Loader";



function Home() {
  const {data: books, error, isSuccess} = useGetBooksRecommendedQuery({limit: 40});


  return (
    <div className="container">
      <Loader loaded={isSuccess} error={error}>
        <ProductList books={books}/>
      </Loader>
    </div>
  );
}

export default Home;