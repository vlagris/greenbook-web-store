import React, {useRef} from "react";
import { Book } from "@/types";
import { useAddToCartMutation } from "@/services/api";
import { addCartItem, cartSelectors } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import useAuth from "@/hooks/useAuth.ts";
import { currency } from "@/constants.ts";
import classes from "./styles.module.scss";
import StarIcon from '@assets/icons/star.svg?react';



function Card({book}: {book: Book}) {
  const dispatch = useAppDispatch();
  const {isAuth} = useAuth();
  const cart = useAppSelector(cartSelectors.cart);
  const [addToCart] = useAddToCartMutation();
  const requestAbort = useRef(() => {});


  function handleAddToCart() {
    const item = cart.items.find(item => item.id === book.id);
    const quantity = item?.quantity ?? 0;

    requestAbort.current();
    dispatch(addCartItem(book))

    if (isAuth) {
      const request = addToCart([
        { id: book.id, quantity: quantity + 1 }
      ]);
      requestAbort.current = request.abort
    }
  }


  return (
    <div className={classes.card}>
      <div className={classes.wrap}>
        <div className={classes.top}>
          <div className={classes.img_wrap}>
            <img
              className={classes.img}
              src={book.image}
              alt=""
            />
          </div>
        </div>

        <div className={classes.info}>
          <div className={classes.price}>
            {book.price + " " + currency.RUB.symbol}
          </div>
          <div className={classes.title}>
            {book.title}
          </div>

          <div className={classes.rating}>
            <StarIcon className={classes.rating_icon}/>
            <span className={classes.rating_text}>
              {book.rating.rate}
            </span>
          </div>

          <button className={classes.btn_cart} onClick={handleAddToCart}>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;