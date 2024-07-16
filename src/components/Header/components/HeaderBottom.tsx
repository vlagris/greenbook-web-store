import React from 'react';
import BurgerMenu from "@components/BurgerMenu";
import Index from "@components/Header/components/Search";
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

        <Index/>

        <div className={classes.nav}>
          <CartButton/>
          <UserMenu/>
        </div>
      </div>
    </div>
  );
}

export default HeaderBottom;