import React, {useLayoutEffect} from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import {authSelectors, setToken, store} from "@/store";



function App() {


  useLayoutEffect(() => {
    const token = authSelectors.userId(store.getState());
    if (token) {
    store.dispatch(setToken(token));
    }
  }, []);


  return (
    <RouterProvider router={router}/>
  )
}

export default App
