import React from 'react';
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "@/hooks/useTypedReduxHooks";
import {logout} from "@/store/userData/userData.slice";
import useAuth from "@/hooks/useAuth";
import BurgerMenu from "@components/Header/BurgerMenu";
import Search from "@components/Header/Search";

import classes from "./styles.module.scss";
// @ts-ignore
import HeartIcon from '@assets/icons/heart.svg?react';
// import BagIcon from '@assets/bag.svg?react';
// @ts-ignore
import BagIcon  from '@assets/icons/bag.svg?react';
// import UserIcon from '@assets/userData.svg?react';
// @ts-ignore
import LogoutIcon from '@assets/icons/logout.svg?react';
import {selectCartTotalQuantity} from "@/store/cart/cart.slice.ts";



function HeaderBottom() {
  const cartTotalQuantity = useAppSelector(selectCartTotalQuantity);
  const {isAuth} = useAuth();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="container">
      <div className={classes.header_bottom}>
        <div className={classes.header_bottom_left}>
          <Link to="/" className={classes.logo}>
            <p className={classes.logo_title}>
              Green
              <span>Book</span>
            </p>
          </Link>
          <BurgerMenu/>
        </div>

        <Search/>
        <div className={classes.navbar}>
          <Link className={classes.navbar_item} to="/">
            <HeartIcon className={classes.icon_stroke}/>
          </Link>
          <Link className={classes.navbar_item} to="/cart">
            <span className={classes.cart_wrap}>
              <BagIcon className={classes.icon_stroke}/>
              {cartTotalQuantity > 0 &&
                <span className={classes.cart_notify}>{cartTotalQuantity}</span>
              }
            </span>
          </Link>
          {isAuth &&
            <button className={classes.navbar_item} onClick={handleLogout}>
              <LogoutIcon className={classes.icon_fill}/>
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default HeaderBottom;