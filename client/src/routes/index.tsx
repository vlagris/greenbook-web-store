import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Catalog from "@pages/Catalog";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Error from "@pages/Error";
import Cart from "@pages/Cart";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: (
      <Layout>
        <Error/>
      </Layout>
    ),
    handle: { crumb: (): string => "Главная" },
    children: [
      {
        index: true,
        element: <Home/>,

      },
      {
        path: "/catalog/:pathName",
        element: <Catalog/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
    ]
  },
]);