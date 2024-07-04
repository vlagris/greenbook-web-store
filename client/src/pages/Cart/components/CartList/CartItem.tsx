import { CartItem } from "@/types";
import { currency } from "@/constants.ts";
import { useAppDispatch } from "@/hooks/useTypedReduxHooks.ts";
import { removeCartItem } from "@/store";
import { useRemoveFromCartMutation } from "@/services/api";
import { formatPrice } from "@/utils/formatPrice.ts";
import Count from "@pages/Cart/components/CartList/Count.tsx";
import classes from "@pages/Cart/components/CartList/styles.module.scss";
import CloseIcon from "@assets/icons/close.svg?react";
import useAuth from "@/hooks/useAuth.ts";



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
          <button className={classes.item_btn_remove} onClick={handleRemove} role="removeButton">
            <CloseIcon className={classes.item_btn_remove_icon}/>
          </button>
        </div>

      </div>
    </li>
  );
}

export default Item;