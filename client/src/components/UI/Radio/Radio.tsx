import React, {useContext, useEffect} from "react";
import {RadioContext} from "@components/UI/Radio/RadioContext.ts";
import classes from "./styles.module.scss";

interface RadioProps {
  name: string,
  id: string,
  children?: React.ReactNode,
  isChecked?: boolean,
}


function Radio({children, isChecked, name, id}: RadioProps) {
  const {radioId, setRadioId} = useContext(RadioContext);

  useEffect(() => {
    if (isChecked) {
      setRadioId(id);
    }
  }, []);

  function handleChange(): void {
    setRadioId(id);
  }


  return (
    <label className={classes.input_wrap}>
      <input
        type="radio"
        name={name}
        className={classes.input}
        onChange={handleChange}
        checked={radioId === id}
      />

      <span className={classes.custom_radio}>
        <span/>
      </span>

      {children}
    </label>
  );
}


export default Radio;



