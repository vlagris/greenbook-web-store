import { createHashRouter } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import Catalog from "@pages/Catalog";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Error from "@pages/Error";
import Cart from "@pages/Cart";
import Account from "@pages/Account";
import PrivateRoute from "@/routes/PrivateRoute.tsx";


export const router = createHashRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: (
      <Layout>
        <Error/>
      </Layout>
    ),
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
      {
        path: "/account",
        element: <PrivateRoute path="/login"/>,
        children: [
          {
            path: "/account/settings",
            element: <Account/>,
          },
        ]
      },
    ]
  },
]);