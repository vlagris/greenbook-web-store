import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import NavbarMobile from "@components/NavbarMobile";



function Layout({children}:{children?: React.ReactNode}) {


  return (
    <>
      <Header/>
      <main className="main">
        {children ?? <Outlet/>}
      </main>
      <Footer/>
      <NavbarMobile/>
    </>
  );
}

export default Layout;
