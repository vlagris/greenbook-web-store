import React from 'react';
import classes from "@pages/Cart/styles.module.scss";
import {currency} from "@/constants.ts";
import {joinClasses} from "@/utils/joinClasses.ts";

function Order({total}: {total: number}) {
  return (
    <div className={classes.order}>
      <h4 className={classes.order_title}>Итоги корзины</h4>

      <div className={classes.order_list}>
        <div className={classes.order_item}>
          <span className={classes.order_row_title}>Товары</span>
          <span className={classes.order_row_value}>
            {total} {currency.RUB.symbol}
          </span>
        </div>

        <div className={classes.order_item}>
          <span className={classes.order_row_title}>Доставка</span>
          <span className={classes.order_row_value}>Бесплатно</span>
        </div>

        <div className={classes.order_item}>
          <span className={classes.order_row_title}>Итого</span>
          <span className={classes.order_total_price}>
            {total} {currency.RUB.symbol}
          </span>
        </div>
      </div>

      <button className={joinClasses(["btn-large", classes.order_btn])}>Перейти к оформлению</button>

    </div>
  );
}

export default Order;