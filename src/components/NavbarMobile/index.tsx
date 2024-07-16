import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {clsx} from "clsx";
import BurgerMenu from "@components/BurgerMenu";
import classes from "@/components/NavbarMobile/styles.module.scss";
import HomeIcon from "@/assets/icons/home.svg?react";
import CartIcon from "@/assets/icons/bag.svg?react";
import UserIcon from "@/assets/icons/user.svg?react";



function NavbarMobile() {
  const [menuShow, setMenuShow] = useState(false);


  const handleMenuClose = () => setMenuShow(false);
  const handleMenuOpen = () => setMenuShow(true);


  return (
    <div className={classes.navbar_mobile}>
      <div className={clsx("container", classes.wrapper)}>
        <Link
          to="/"
          className={classes.link}
          onClick={handleMenuClose}
        >
          <HomeIcon className={classes.link_icon}/>
        </Link>

        <div
          className={classes.link_wrap}
          onClick={handleMenuOpen}
        >
          <BurgerMenu show={menuShow}/>
        </div>

        <Link
          to="/cart"
          className={classes.link}
          onClick={handleMenuClose}
        >
          <CartIcon className={classes.link_icon}/>
        </Link>


        <Link
          to="/account/settings"
          className={classes.link}
          onClick={handleMenuClose}
        >
          <UserIcon className={classes.link_icon}/>
        </Link>
      </div>
    </div>
  );
}

export default NavbarMobile;