import React from 'react';
// @ts-ignore
import classes from "@pages/Cart/styles.module.scss";
import {Link} from "react-router-dom";
import {joinClasses} from "@/utils/joinClasses.ts";

function EmptyCart() {
  return (
    <div className={joinClasses([classes.cart, classes.cart_empty])}>
      <h2 className={classes.title}>
        В корзине пока пусто
      </h2>
      <p className={classes.description}>
        Воспользуйтесь поиском, чтобы найти всё, что нужно. <br/>
        Если в Корзине были товары, войдите, чтобы посмотреть список
      </p>
      <Link to={"/login"} className="btn">Войти</Link>
    </div>
  );
}

export default EmptyCart;