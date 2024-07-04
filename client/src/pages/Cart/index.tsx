import { useAppSelector } from "@/hooks/useTypedReduxHooks.ts";
import { cartSelectors, authSelectors } from "@/store";
import { useGetCartQuery } from "@/services/api";
import Loader from "@components/Loader";
import CartForm from "@pages/Cart/components/CartForm.tsx";
import EmptyCart from "@pages/Cart/components/EmptyCart.tsx";



function Cart() {
  const cart = useAppSelector(cartSelectors.cart);
  const tokenSuccess = useAppSelector(authSelectors.tokenSuccess);
  const {isUninitialized, refetch} = useGetCartQuery(undefined, {skip: !tokenSuccess})
  const cartSuccess = useAppSelector(cartSelectors.cartSuccess);


  function refreshCart() {
    if (!isUninitialized) {
      refetch()
    }
  }


  return (
    <Loader loaded={cartSuccess}>
      {cart.items.length ?
        <CartForm
          cart={cart}
          refreshCart={refreshCart}
        />
        :
        <EmptyCart/>
      }
    </Loader>
  );
}

export default Cart;