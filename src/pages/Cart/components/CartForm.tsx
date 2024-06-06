import { useEffect, useState } from "react";
import { Cart } from "@/types.ts";
import CartList from "@pages/Cart/components/CartList";
import Order from "@pages/Cart/components/Order.tsx";
import { formatPrice } from "@/utils/formatPrice.ts";
import classes from "@pages/Cart/styles.module.scss";


function CartForm({cart}: {cart: Cart}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let result = 0;
    cart.items.forEach((item) => {
      result = result + (item.price * item.quantity);
    });
    setTotal(formatPrice(result));
  }, [cart])


  return (
    <div className={classes.cart}>
      <div className="container">
        <h2 className={classes.title}>Корзина покупок</h2>
        <div className={classes.content}>

          <div className={classes.left}>
            <div className={classes.section}>
              <CartList items={cart.items}/>
            </div>
          </div>

          <div className={classes.right}>
            <div className={classes.section}>
              <Order total={total}/>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartForm;