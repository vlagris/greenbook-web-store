import React from 'react';
import {Link} from "react-router-dom";
import {clsx} from "clsx";
import classes from "@pages/Cart/styles.module.scss";

function EmptyCart() {
  return (
    <div className={clsx(classes.cart, classes.cart_empty)}>
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