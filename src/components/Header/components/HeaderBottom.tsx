import React from 'react';
import BurgerMenu from "@components/Header/components/BurgerMenu";
import Search from "@components/Header/components/Search.tsx";
import UserMenu from "@components/Header/components/UserMenu/UserMenu.tsx";
import HeaderLogo from "@components/Header/components/HeaderLogo.tsx";
import CartButton from "@components/Header/components/CartButton.tsx";
import classes from "../styles.module.scss";



function HeaderBottom() {



  return (
    <div className="container">
      <div className={classes.header_bottom}>
        <div className={classes.header_bottom_left}>
          <HeaderLogo/>
          <BurgerMenu/>
        </div>

        <Search/>

        <div className={classes.navbar}>
          <CartButton/>
          <UserMenu/>
        </div>
      </div>
    </div>
  );
}

export default HeaderBottom;