import React, { useEffect, useState, useRef } from 'react';
import { clsx } from "clsx";
import { useAppDispatch } from "@/hooks/useTypedReduxHooks.ts";
import {updateCartItem} from "@/store";
import classes from "@pages/Cart/components/CartList/styles.module.scss";
import {useAddToCartMutation} from "@/services/api";
import useAuth from "@/hooks/useAuth.ts";



interface CountProps {
  quantity: number,
  id: string
}

function Count({quantity: initialQuantity, id}: CountProps) {
  const dispatch = useAppDispatch();
  const {isAuth} = useAuth();
  const [addToCart] = useAddToCartMutation();
  const [quantity, setQuantity] = useState(initialQuantity);
  const requestAbort = useRef(() => {});



  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);


  function updateItem({ id, quantity }: {id: string, quantity: number}) {
    requestAbort.current();
    dispatch(updateCartItem({id, quantity: quantity }));

    if (isAuth) {
      const request = addToCart([{id, quantity }])
      requestAbort.current = request.abort;
    }
  }


  function handleButton(newQuantity: number) {
    return () => {
      if (newQuantity > 0) {
        setQuantity(newQuantity);
        updateItem({id, quantity: newQuantity});
      }
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  }

  function handleBlur() {
    if (quantity < 1) {
      setQuantity(1);
      updateItem({id, quantity: 1});
    } else {
      updateItem({id, quantity: quantity});
    }
  }


  return (
    <div className={classes.count}>
      <button
        className={clsx(classes.count_btn, classes.count_minus)}
        onClick={handleButton(quantity - 1)}
      />
      <input
        type="text"
        className={classes.count_input} value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        className={clsx(classes.count_btn, classes.count_plus)}
        onClick={handleButton(quantity + 1)}
      />
    </div>
  );
}

export default Count;