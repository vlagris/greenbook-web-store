import React from "react";
import {Outlet, Navigate, useLocation} from "react-router-dom";
import useAuth from "@/hooks/useAuth.ts";



interface PrivateRouteProps {
  children?: React.ReactNode,
  path: string
}

function PrivateRoute({children, path }:PrivateRouteProps) {
  const location = useLocation();
  const {isAuth} = useAuth();


  if (isAuth) {
    return (
      <>
        {children ?? <Outlet/>}
      </>
    );
  }
  else {
    return (
      <Navigate to={path}  replace={true} state={{ from: location }}/>
    );
  }


  // return (
  //   <Loader>
  //     {isAuth ?
  //       children ?? <Outlet/>
  //       :
  //       <Navigate to={path}/>
  //     }
  //   </Loader>
  // );
}

export default PrivateRoute;
