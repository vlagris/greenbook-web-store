import classes from "@pages/Cart/styles.module.scss";
import CartList from "@pages/Cart/components/CartList";
import Order from "@pages/Cart/components/Order.tsx";
import {useAppSelector} from "@/hooks/useTypedReduxHooks.ts";
import {useEffect, useState} from "react";
import { cartSelectors } from "@/store/cart";
import Loader from "@components/Loader";
import EmptyCart from "@pages/Cart/components/EmptyCart.tsx";

function Cart() {
  const cart = useAppSelector(cartSelectors.cart);
  const cartLoading = useAppSelector(cartSelectors.loading);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let result = 0;
    cart.items.forEach((item) => {
      result = result + (item.price * item.quantity);
    });
    setTotal(Number(result.toFixed(2)));
  }, [cart])


  return (
    <Loader isLoading={cartLoading}>
      {cart.items.length ?
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
        :
        <EmptyCart/>
      }


    </Loader>

  );
}

export default Cart;