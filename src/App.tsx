import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "@/router.tsx";
import { useAppDispatch } from "@/hooks/useTypedReduxHooks.ts";
import { fetchGenres } from "@/store/genres";
import { fetchCart } from "@/store/cart";
import { fetchToken } from "@/store/auth";



function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestLoading = async () => {
      dispatch(fetchGenres());
      await dispatch(fetchToken());
      dispatch(fetchCart());
    }

    requestLoading();
  }, []);


  return (
    <RouterProvider router={router}/>
  )
}

export default App
