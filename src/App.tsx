import React, {useLayoutEffect} from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";
import {authSelectors, setToken, store} from "@/store";



function App() {

  useLayoutEffect(() => {
    store.dispatch(setToken(authSelectors.userId(store.getState())));
  }, []);


  return (
    <RouterProvider router={router}/>
  )
}

export default App
