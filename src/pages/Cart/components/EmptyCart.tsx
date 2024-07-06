import React from 'react';
import {Link} from "react-router-dom";
import {clsx} from "clsx";
import useAuth from "@/hooks/useAuth.ts";
import classes from "@pages/Cart/styles.module.scss";



function EmptyCart() {
  const {isAuth} = useAuth()

  return (
    <div className={clsx(classes.cart, classes.cart_empty)}>
      <h2 className={classes.title}>
        В корзине пока пусто
      </h2>

      {isAuth ?
        <>
          <p className={classes.description}>
            Загляните на главную, чтобы выбрать товары <br/>
            или найдите нужное в поиске
          </p>
          <Link to="/" className="btn btn-fill">Перейти на главную</Link>
        </>
        :
        <>
          <p className={classes.description}>
            Воспользуйтесь поиском, чтобы найти всё, что нужно. <br/>
            Если в Корзине были товары, войдите, чтобы посмотреть список
          </p>
          <Link to="/login" className="btn btn-fill">Войти</Link>
        </>
      }

    </div>
  );
}

export default EmptyCart;