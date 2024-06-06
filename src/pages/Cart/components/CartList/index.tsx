import {CartItem} from "@/types.ts";
import {fetchCart} from "@/store/cart";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import Item from "@pages/Cart/components/CartList/Item.tsx";
import classes from "@pages/Cart/components/CartList/styles.module.scss";


interface CartListProps {
  items: CartItem[]
}
function CartList({items}: CartListProps) {
  const dispatch = useAppDispatch();
  const colsNames = ["Товар", "Цена", "Количество", "Итог"]


  function handleCartUpdate() {
    dispatch(fetchCart());
  }


  return (
    <>
      <div className={classes.top}>
        <div className={classes.cols_wrap}>
          {colsNames.map(colName => (
            <div key={colName} className={classes.col}>
              <h4 className={classes.col_name}>{colName}</h4>
            </div>
          ))}
        </div>
      </div>

      <ul className={classes.list}>
        {items.map((item) =>
          <Item key={item.id} item={item}/>
        )}
      </ul>

      <div className={classes.bottom}>
        <button className={classes.btn}>Вернуться в католог</button>
        <button className={classes.btn} onClick={handleCartUpdate} role="cartUpdate">
          Обновить
        </button>
      </div>
    </>
  );
}

export default CartList;