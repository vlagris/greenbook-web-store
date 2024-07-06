import React from 'react';
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { cartSelectors, authSelectors } from "@/store";
import {useGetCartQuery} from "@/services/api";
import classes from "@components/Header/styles.module.scss";

import BagIcon from '@assets/icons/bag.svg?react';


function CartButton() {
  const tokenSuccess = useAppSelector(authSelectors.tokenSuccess);
  useGetCartQuery(undefined, {skip: !tokenSuccess});
  const cartTotal = useAppSelector(cartSelectors.totalQuantity);


  return (
    <Link className={clsx(classes.navbar_item, classes.cart_button)} to="/cart">
      <BagIcon className={classes.icon_stroke}/>
      {cartTotal > 0 &&
        <span className={classes.cart_notify}>{cartTotal}</span>
      }
    </Link>
  );
}

export default CartButton;