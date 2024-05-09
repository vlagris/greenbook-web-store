import React from 'react';
import { Link } from "react-router-dom";

import { cartSelectors } from "@/store/cart";
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { logout } from "@/store/auth";
import useAuth from "@/hooks/useAuth.ts";
import BurgerMenu from "@components/Header/components/BurgerMenu";
import Search from "@components/Header/components/Search.tsx";
import UserMenu from "@components/Header/components/UserMenu/UserMenu.tsx";
import HeaderLogo from "@components/Header/components/HeaderLogo.tsx";

import classes from "../styles.module.scss";
import BagIcon from '@assets/icons/bag.svg?react';
// import HeartIcon from '@assets/icons/heart.svg?react';



function HeaderBottom() {
  const cartTotalQuantity = useAppSelector(cartSelectors.totalQuantity);
  const dispatch = useAppDispatch();
  const {isAuth} = useAuth();


  async function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="container">
      <div className={classes.header_bottom}>
        <div className={classes.header_bottom_left}>
          <HeaderLogo/>
          <BurgerMenu/>
        </div>

        <Search/>

        <div className={classes.navbar}>
          {/*<Link className={classes.navbar_item} to="/">*/}
          {/*  <HeartIcon className={classes.icon_stroke}/>*/}
          {/*</Link>*/}
          <Link className={classes.navbar_item} to="/cart">
            <span className={classes.cart_wrap}>
              <BagIcon className={classes.icon_stroke}/>
              {cartTotalQuantity > 0 &&
                <span className={classes.cart_notify}>{cartTotalQuantity}</span>
              }
            </span>
          </Link>
          {isAuth &&
            <UserMenu handleLogout={handleLogout}/>
          }
        </div>
      </div>
    </div>
  );
}

export default HeaderBottom;