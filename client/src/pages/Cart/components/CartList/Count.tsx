import React, {useEffect, useState} from 'react';
import classes from "@pages/Cart/components/CartList/styles.module.scss";
import {useAppDispatch} from "@/hooks/useTypedReduxHooks.ts";
import {updateItemInCart} from "@/store/cart/cart.slice.ts";

interface CountProps {
  quantity: number,
  id: string
}

function Count({quantity: initialQuantity, id}: CountProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const dispatch = useAppDispatch();


  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);


  function handleButton(newQuantity: number) {
    return () => {
      if (newQuantity >= 1) {
        dispatch(updateItemInCart({id, quantity: newQuantity }));
        setQuantity(newQuantity);
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
      dispatch(updateItemInCart({id, quantity: 1 }));
      setQuantity(1);
      return;
    }
    dispatch(updateItemInCart({id, quantity: quantity }));
  }



  return (
    <div className={classes.count}>
      <button
        className={classes.count_btn + " " + classes.count_minus}
        onClick={handleButton(quantity - 1)}
      />
      <input
        type="text"
        className={classes.count_input} value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        className={classes.count_btn + " " + classes.count_plus}
        onClick={handleButton(quantity + 1)}
      />
    </div>
  );
}

export default Count;