import {clsx} from "clsx";
import { CartItem } from "@/types";
import { currency } from "@/constants.ts";
import { useAppDispatch } from "@/hooks/useTypedReduxHooks.ts";
import useAuth from "@/hooks/useAuth.ts";
import { removeCartItem } from "@/store";
import { useRemoveFromCartMutation } from "@/services/api";
import { formatPrice } from "@/utils/formatPrice.ts";
import Count from "@pages/Cart/components/CartList/Count.tsx";
import classes from "@pages/Cart/components/CartList/styles.module.scss";
import DeleteIcon from "@assets/icons/delete.svg?react";



interface ItemProps {
  item: CartItem
}

function Item({item}: ItemProps) {
  const dispatch = useAppDispatch();
  const {isAuth} = useAuth();
  const [removeFromCart] = useRemoveFromCartMutation()
  const subtotal = formatPrice(item.price * item.quantity);


  function handleRemove() {
    dispatch(removeCartItem(item.id));
    if (isAuth) {
      removeFromCart([item.id]);
    }
  }


  return (
    <li className={clsx(classes.item, classes.row)}>

      <div className={clsx(classes.col, classes.item_info)}>
        <div className={classes.item_img_wrap}>
          <img className={classes.item_img} src={item.image} alt=""/>
        </div>

        <div className={classes.item_info_main}>
          <div className={classes.item_info_price}>
            {subtotal} {currency.RUB.symbol}
          </div>
          <h4 className={classes.item_title}>{item.title}</h4>

          <div className={classes.item_info_count}>
            <Count id={item.id} quantity={item.quantity}/>
          </div>

          <button
            className={classes.item_btn_remove}
            onClick={handleRemove}
            role="removeButton"
          >
            <DeleteIcon className={classes.item_btn_remove_icon}/>
          </button>
        </div>

      </div>

      <div className={clsx(classes.col, classes.col_desktop)}>
        <div className={classes.item_subtotal}>
          {subtotal} {currency.RUB.symbol}
        </div>
      </div>

      <div className={clsx(classes.col, classes.col_desktop)}>
        <Count id={item.id} quantity={item.quantity}/>
      </div>

    </li>
  );
}

export default Item;