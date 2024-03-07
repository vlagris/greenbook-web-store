import { RouterProvider } from "react-router-dom";
import {router} from "@/routes";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {useEffect} from "react";
import {getGenres} from "@/store/genres/genres.slice.ts";
import {getCart} from "@/store/cart/cart.slice.ts";
import {refreshToken} from "@/store/userData/userData.slice.ts";



function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestLoading = async () => {
      dispatch(getGenres());
      await dispatch(refreshToken());
      dispatch(getCart());
    }

    requestLoading();
  }, []);


  return (
    <RouterProvider router={router}/>
  )
}

export default App
