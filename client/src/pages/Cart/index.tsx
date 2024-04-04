import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { cartSelectors } from "@/store/cart";
import Loader from "@components/Loader";
import CartForm from "@pages/Cart/components/CartForm.tsx";
import EmptyCart from "@pages/Cart/components/EmptyCart.tsx";


function Cart() {
  const cart = useAppSelector(cartSelectors.cart);
  const cartLoading = useAppSelector(cartSelectors.loading);

  return (
    <Loader isLoading={cartLoading}>
      {cart.items.length ?
        <CartForm cart={cart}/>
        :
        <EmptyCart/>
      }
    </Loader>
  );
}

export default Cart;