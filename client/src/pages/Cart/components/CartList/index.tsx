import { CartItem } from "@/types";
import Item from "@pages/Cart/components/CartList/CartItem.tsx";
import classes from "@pages/Cart/components/CartList/styles.module.scss";


interface CartListProps {
  items: CartItem[],
  refreshCart: () => void
}
function CartList({items, refreshCart}: CartListProps) {
  const colsNames = ["Товар", "Цена", "Количество"]


  return (
    <>
      <div className={classes.top}>
        <div className={classes.row}>
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
        <button className="btn btn-text">Вернуться в католог</button>
        <button className={"btn btn-text"} onClick={refreshCart} role="cartUpdate">
          Обновить
        </button>
      </div>
    </>
  );
}

export default CartList;