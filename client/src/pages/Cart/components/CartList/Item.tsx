import Count from "@pages/Cart/components/CartList/Count.tsx";
import classes from "@pages/Cart/components/CartList/styles.module.scss";
// @ts-ignore
import CloseIcon from "@assets/icons/close.svg?react";
import {CartItem} from "@/types.ts";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {removeItemFromCart} from "@/store/cart/cart.slice.ts";
import {currency} from "@/constants.ts";


function Item({item}: {item: CartItem}) {
  const dispatch = useAppDispatch();
  const subtotal = (item.price * item.quantity).toFixed(0)


  function handleRemove() {
    dispatch(removeItemFromCart(item.id));
  }

  return (
    <li className={classes.item}>
      <div className={classes.cols_wrap}>

        <div className={classes.col}>
          <div className={classes.item_info}>
            <div className={classes.item_img_wrap}>
              <img className={classes.item_img} src={item.image} alt=""/>
            </div>
            <h4 className={classes.item_title}>{item.title}</h4>
          </div>
        </div>

        <div className={classes.col}>
          <p className={classes.item_price}>
            {item.price} {currency.RUB.symbol}
          </p>
        </div>

        <div className={classes.col}>
          <Count id={item.id} quantity={item.quantity}/>
        </div>

        <div className={classes.col}>
          <p className={classes.item_subtotal}>
            {subtotal} {currency.RUB.symbol}
          </p>
        </div>

        <div className={classes.col}>
          <button className={classes.item_btn_remove} onClick={handleRemove}>
            <CloseIcon className={classes.item_btn_remove_icon}/>
          </button>
        </div>

      </div>
    </li>
  );
}

export default Item;