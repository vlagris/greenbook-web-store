import classes from "@pages/Cart/components/CartList/styles.module.scss";
import Item from "@pages/Cart/components/CartList/Item.tsx";
import {CartItem} from "@/types.ts";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {getCart} from "@/store/cart/cart.slice.ts";

function CartList({items}: {items: CartItem[]}) {
  const dispatch = useAppDispatch();

  function handleCartUpdate() {
    dispatch(getCart());
  }

  return (
    <>
      <div className={classes.top}>
        <div className={classes.cols_wrap}>
          <div className={classes.col}>
            <h4 className={classes.col_name}>Товар</h4>
          </div>
          <div className={classes.col}>
            <h4 className={classes.col_name}>Цена</h4>
          </div>
          <div className={classes.col}>
            <h4 className={classes.col_name}>Количество</h4>
          </div>
          <div className={classes.col}>
            <h4 className={classes.col_name}>Итог</h4>
          </div>
        </div>
      </div>

      <ul className={classes.list}>
        {items.map((item) =>
          <Item key={item.id} item={item}/>
        )}
      </ul>

      <div className={classes.bottom}>
        <button className={classes.btn}>Вернуться в католог</button>
        <button className={classes.btn} onClick={handleCartUpdate}>
          Обновить
        </button>
      </div>
    </>
  );
}

export default CartList;